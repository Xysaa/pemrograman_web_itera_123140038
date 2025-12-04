from pyramid.config import Configurator
from sqlalchemy import engine_from_config

from .models import Base, init_engine, configure_session


def main(global_config, **settings):
    engine = engine_from_config(settings, 'sqlalchemy.')

    init_engine(engine)
    configure_session(engine)
    Base.metadata.create_all(bind=engine)

    config = Configurator(settings=settings)

    config.add_route('list_matakuliah',   '/api/matakuliah',      request_method='GET')
    config.add_route('create_matakuliah', '/api/matakuliah',      request_method='POST')
    config.add_route('get_matakuliah',    '/api/matakuliah/{id}', request_method='GET')
    config.add_route('update_matakuliah', '/api/matakuliah/{id}', request_method='PUT')
    config.add_route('delete_matakuliah', '/api/matakuliah/{id}', request_method='DELETE')

    config.scan('.views')

    return config.make_wsgi_app()
