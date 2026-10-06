const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');

function closeMenu(){
  if(!menuButton||!nav)return;
  menuButton.setAttribute('aria-expanded','false');
  menuButton.setAttribute('aria-label','Открыть меню');
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
}

if(menuButton&&nav){
  menuButton.addEventListener('click',()=>{
    const open=menuButton.getAttribute('aria-expanded')==='true';
    if(open){closeMenu();return}
    menuButton.setAttribute('aria-expanded','true');
    menuButton.setAttribute('aria-label','Закрыть меню');
    nav.classList.add('open');
    document.body.classList.add('menu-open');
  });
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu()});
}

document.querySelectorAll('[data-email-form]').forEach(form=>{
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const data=new FormData(form);
    const first=String(data.get('first-name')||'').trim();
    const last=String(data.get('last-name')||'').trim();
    const email=String(data.get('email')||'').trim();
    const message=String(data.get('message')||'').trim();
    const subject=encodeURIComponent('Запрос с сайта АпакРус');
    const body=encodeURIComponent(`Имя: ${first}${last?' '+last:''}\nЭл. адрес: ${email}\n\n${message}`);
    const note=form.querySelector('.form-note');
    if(note)note.textContent='Письмо подготовлено. Проверьте его и нажмите отправить в почтовой программе.';
    window.location.href=`mailto:sale@apak-rus.ru?subject=${subject}&body=${body}`;
  });
});
