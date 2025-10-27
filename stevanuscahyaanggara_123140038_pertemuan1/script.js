(function(){
  const STORAGE_KEY = 'tasks-v1';

  /** @type {Array<{id:string,name:string,course:string,deadline:string,completed:boolean,createdAt:number}>} */
  let tasks = [];

  // Elements
  
  const form = document.getElementById('taskForm');
  const inputId = document.getElementById('taskId');
  const inputName = document.getElementById('name');
  const inputCourse = document.getElementById('course');
  const inputDeadline = document.getElementById('deadline');
  const submitBtn = document.getElementById('submitBtn');
  const statusSelect = document.getElementById('statusSelect');
  const cancelEditBtn = document.getElementById('cancelEditBtn');
  
  const statusFilter = document.getElementById('statusFilter');
  const courseFilter = document.getElementById('courseFilter');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');

  const list = document.getElementById('taskList');
  const emptyState = document.getElementById('emptyState');
  const countBadge = document.getElementById('incompleteCount');
  const itemTpl = document.getElementById('taskItemTemplate');

  // Error elements
  const errName = document.getElementById('err-name');
  const errCourse = document.getElementById('err-course');
  const errDeadline = document.getElementById('err-deadline');

  // Utils
  const uid = () => Math.random().toString(36).slice(2,10) + Date.now().toString(36);
  const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  const load = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const fmtDate = (iso) => {
    try {
      const d = new Date(iso + 'T00:00:00');
      if (Number.isNaN(d.getTime())) return '-';
      return d.toLocaleDateString('id-ID', { year:'numeric', month:'short', day:'2-digit' });
    } catch { return '-'; }
  };

  function setFormMode(mode){
    if(mode === 'edit'){
      submitBtn.textContent = 'Simpan Perubahan';
      cancelEditBtn.hidden = false;
    } else {
      submitBtn.textContent = 'Tambah Tugas';
      cancelEditBtn.hidden = true;
      inputId.value = '';
      form.reset();
    }
  }

  function validate(){
    let ok = true;
    // reset messages
    errName.textContent = '';
    errCourse.textContent = '';
    errDeadline.textContent = '';

    const name = inputName.value.trim();
    if(!name){ errName.textContent = 'Nama tugas tidak boleh kosong.'; ok = false; }

    const course = inputCourse.value.trim();
    if(!course){ errCourse.textContent = 'Mata kuliah tidak boleh kosong.'; ok = false; }

    const deadline = inputDeadline.value;
    const d = new Date(deadline + 'T00:00:00');
    if(!deadline || Number.isNaN(d.getTime())){
      errDeadline.textContent = 'Deadline harus tanggal yang valid.'; ok = false;
    }

    return ok;
  }

    function upsertTask(e){
    e.preventDefault();
    if(!validate()) return;

    const payload = {
        name: inputName.value.trim(),
        course: inputCourse.value.trim(),
        deadline: inputDeadline.value,
        completed: statusSelect.value === "true", // ambil dari dropdown
    };

    const id = inputId.value;
    if(id){
        const idx = tasks.findIndex(t => t.id === id);
        if(idx !== -1){
        tasks[idx] = { ...tasks[idx], ...payload };
        save();
        render();
        setFormMode('create');
        }
    } else {
        const newTask = { id: uid(), createdAt: Date.now(), ...payload };
        tasks.unshift(newTask);
        save();
        render();
        form.reset();
        inputName.focus();
    }
    }


  function startEdit(id){
    const t = tasks.find(x => x.id === id);
    if(!t) return;
    inputId.value = t.id;
    inputName.value = t.name;
    inputCourse.value = t.course;
    inputDeadline.value = t.deadline;
    setFormMode('edit');
    inputName.focus();
  }

  function cancelEdit(){
    setFormMode('create');
  }

  function toggle(id){
    const t = tasks.find(x => x.id === id);
    if(!t) return;
    t.completed = !t.completed;
    save();
    render();
  }

  function remove(id){
    const t = tasks.find(x => x.id === id);
    if(!t) return;
    const ok = confirm(`Hapus tugas \"${t.name}\"?`);
    if(!ok) return;
    tasks = tasks.filter(x => x.id !== id);
    save();
    render();
  }

  function applyFilters(data){
    let out = [...data];

    const st = statusFilter.value;
    if(st === 'pending') out = out.filter(t => !t.completed);
    if(st === 'completed') out = out.filter(t => t.completed);

    const cf = courseFilter.value;
    if(cf !== 'all') out = out.filter(t => t.course.toLowerCase() === cf.toLowerCase());

    const q = searchInput.value.trim().toLowerCase();
    if(q){
      out = out.filter(t => t.name.toLowerCase().includes(q) || t.course.toLowerCase().includes(q));
    }

    const s = sortSelect.value;
    out.sort((a,b)=>{
      switch(s){
        case 'deadlineAsc': return (a.deadline||'').localeCompare(b.deadline||'');
        case 'deadlineDesc': return (b.deadline||'').localeCompare(a.deadline||'');
        case 'createdAsc': return a.createdAt - b.createdAt;
        case 'createdDesc': return b.createdAt - a.createdAt;
        case 'nameDesc': return b.name.localeCompare(a.name);
        case 'nameAsc':
        default: return a.name.localeCompare(b.name);
      }
    });

    return out;
  }

  function updateCourseFilterOptions(){
    const uniq = Array.from(new Set(tasks.map(t => t.course.trim()).filter(Boolean))).sort((a,b)=>a.localeCompare(b));
    const current = courseFilter.value;
    courseFilter.innerHTML = '<option value="all">Semua</option>' + uniq.map(c=>`<option value="${c}">${c}</option>`).join('');
    if(uniq.includes(current)) courseFilter.value = current; else courseFilter.value = 'all';
  }

  function render(){
    updateCourseFilterOptions();

    const pending = tasks.filter(t => !t.completed).length;
    countBadge.textContent = `${pending} belum selesai`;

    const data = applyFilters(tasks);

    list.innerHTML = '';
    if(data.length === 0){
      emptyState.hidden = false; 
      return;
    } else emptyState.hidden = true;

    const frag = document.createDocumentFragment();

    for(const t of data){
      const node = itemTpl.content.firstElementChild.cloneNode(true);
      const checkbox = node.querySelector('.toggle');
      const nameEl = node.querySelector('.name');
      const courseEl = node.querySelector('.course');
      const deadlineEl = node.querySelector('.deadline');
      const statusEl = node.querySelector('.status');
      const editBtn = node.querySelector('.edit');
      const delBtn = node.querySelector('.delete');

      nameEl.textContent = t.name;
      courseEl.textContent = t.course;
      deadlineEl.textContent = `Deadline: ${fmtDate(t.deadline)}`;
      statusEl.textContent = t.completed ? 'Selesai' : 'Belum';
      statusEl.classList.toggle('done', t.completed);

      if(t.completed) node.classList.add('done');

      checkbox.checked = t.completed;
      checkbox.addEventListener('change', ()=> toggle(t.id));
      editBtn.addEventListener('click', ()=> startEdit(t.id));
      delBtn.addEventListener('click', ()=> remove(t.id));

      frag.appendChild(node);
    }

    list.appendChild(frag);
  }

  function init(){
    tasks = load();

    tasks = tasks.map(t=>({
      id: t.id || uid(),
      name: t.name || '',
      course: t.course || '',
      deadline: t.deadline || '',
      completed: Boolean(t.completed),
      createdAt: t.createdAt || Date.now()
    }));
    save();

    form.addEventListener('submit', upsertTask);
    cancelEditBtn.addEventListener('click', cancelEdit);

    for(const el of [statusFilter, courseFilter, searchInput, sortSelect]){
      el.addEventListener('input', render);
      el.addEventListener('change', render);
    }

    inputDeadline.min = new Date().toISOString().slice(0,10);

    render();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
