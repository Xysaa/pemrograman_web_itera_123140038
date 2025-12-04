from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import IntegrityError
import json

from .models import Matakuliah, get_db_session


def json_response(data, status=200):
    """
    Helper buat balikin response JSON.
    """
    body = json.dumps(data)
    return Response(
        body=body,
        status=status,
        content_type='application/json; charset=utf-8'
    )


@view_config(route_name='list_matakuliah')
def list_matakuliah(request):
    session = get_db_session()
    matkul_list = session.query(Matakuliah).all()
    data = [m.to_dict() for m in matkul_list]
    return json_response(data)


@view_config(route_name='get_matakuliah')
def get_matakuliah(request):
    session = get_db_session()
    matkul_id = request.matchdict.get('id')

    matkul = session.query(Matakuliah).get(matkul_id)
    if not matkul:
        return json_response({'error': 'Matakuliah tidak ditemukan'}, status=404)

    return json_response(matkul.to_dict())


@view_config(route_name='create_matakuliah')
def create_matakuliah(request):
    session = get_db_session()

    try:
        payload = request.json_body
    except Exception:
        return json_response({'error': 'Body harus JSON'}, status=400)

    required_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']
    for field in required_fields:
        if field not in payload:
            return json_response({'error': f'Field {field} wajib diisi'}, status=400)

    matkul = Matakuliah(
        kode_mk=payload['kode_mk'],
        nama_mk=payload['nama_mk'],
        sks=int(payload['sks']),
        semester=int(payload['semester']),
    )

    session.add(matkul)
    try:
        session.commit()
    except IntegrityError:
        session.rollback()
        return json_response({'error': 'kode_mk sudah digunakan'}, status=400)

    return json_response(matkul.to_dict(), status=201)


@view_config(route_name='update_matakuliah')
def update_matakuliah(request):
    session = get_db_session()
    matkul_id = request.matchdict.get('id')

    matkul = session.query(Matakuliah).get(matkul_id)
    if not matkul:
        return json_response({'error': 'Matakuliah tidak ditemukan'}, status=404)

    try:
        payload = request.json_body
    except Exception:
        return json_response({'error': 'Body harus JSON'}, status=400)

    # Update jika dikirim
    if 'kode_mk' in payload:
        matkul.kode_mk = payload['kode_mk']
    if 'nama_mk' in payload:
        matkul.nama_mk = payload['nama_mk']
    if 'sks' in payload:
        matkul.sks = int(payload['sks'])
    if 'semester' in payload:
        matkul.semester = int(payload['semester'])

    try:
        session.commit()
    except IntegrityError:
        session.rollback()
        return json_response({'error': 'kode_mk sudah digunakan'}, status=400)

    return json_response(matkul.to_dict())


@view_config(route_name='delete_matakuliah')
def delete_matakuliah(request):
    session = get_db_session()
    matkul_id = request.matchdict.get('id')

    matkul = session.query(Matakuliah).get(matkul_id)
    if not matkul:
        return json_response({'error': 'Matakuliah tidak ditemukan'}, status=404)

    session.delete(matkul)
    session.commit()

    return json_response({'message': 'Matakuliah berhasil dihapus'})
