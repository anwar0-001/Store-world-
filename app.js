const talents=[
 {id:"sara",n:"سارة العلوي",r:"مصممة UI/UX",v:"س",p:"$35 / ساعة",cat:"design",projects:84},
 {id:"youssef",n:"يوسف بناني",r:"Full-stack Developer",v:"ي",p:"$42 / ساعة",cat:"dev",projects:92},
 {id:"maryam",n:"مريم آيت",r:"كاتبة ومختصة SEO",v:"م",p:"$25 / ساعة",cat:"writing",projects:76},
 {id:"adam",n:"آدم رشيد",r:"Video & Motion Designer",v:"أ",p:"$38 / ساعة",cat:"video",projects:81}
];
const categoryNames={design:"التصميم",dev:"البرمجة",marketing:"التسويق",video:"الفيديو",writing:"الكتابة",business:"الأعمال"};
const grid=document.getElementById("talentGrid");
const modal=document.getElementById("modal"),content=document.getElementById("modalContent");
const savedKey="store-world-saved-talent-v1";
let saved=new Set();
try{saved=new Set(JSON.parse(localStorage.getItem(savedKey)||"[]"))}catch{}
let activeCategory="";
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function renderTalents(query=""){
 const q=query.trim().toLocaleLowerCase("ar");
 const results=talents.filter(t=>(!activeCategory||t.cat===activeCategory)&&(!q||[t.n,t.r,categoryNames[t.cat]].some(v=>v.toLocaleLowerCase("ar").includes(q))));
 grid.innerHTML=results.map(t=>`<article class="talent"><button class="save-talent" data-save="${t.id}" aria-label="${saved.has(t.id)?"إزالة من المحفوظات":"حفظ الموهبة"}" aria-pressed="${saved.has(t.id)}">${saved.has(t.id)?"♥":"♡"}</button><div class="avatar">${t.v}</div><h3>${t.n}</h3><p>${t.r}</p><span class="stars">★★★★★</span><span style="color:#91a3b8;font-size:11px"> 4.9 • +${t.projects} مشروع</span><div class="price"><span>يبدأ من</span><b>${t.p}</b></div></article>`).join("");
 if(!results.length)grid.innerHTML='<p class="empty-results">لا توجد نتائج مطابقة. جرّب كلمة أخرى أو أزل تصفية الفئة.</p>';
 grid.querySelectorAll("[data-save]").forEach(button=>button.addEventListener("click",()=>{const id=button.dataset.save;saved.has(id)?saved.delete(id):saved.add(id);localStorage.setItem(savedKey,JSON.stringify([...saved]));renderTalents(query)}));
 return results.length;
}
function openModal(title,body){content.innerHTML=`<h2>${title}</h2>${body}`;modal.classList.remove("hidden")}
document.getElementById("closeModal").onclick=()=>modal.classList.add("hidden");
modal.onclick=e=>{if(e.target===modal)modal.classList.add("hidden")};
document.addEventListener("keydown",e=>{if(e.key==="Escape")modal.classList.add("hidden")});
function demoAccount(mode){openModal(mode==="join"?"ابدأ مع Store World":"تسجيل الدخول",`<p style="color:#91a3b8">هذه نسخة عرض للواجهة. لا توجد خدمة حسابات أو قاعدة بيانات مرتبطة بعد.</p><label for="demoEmail">البريد الإلكتروني</label><input id="demoEmail" type="email" autocomplete="email" placeholder="you@example.com" required><button class="primary" id="demoSubmit" style="width:100%">${mode==="join"?"متابعة":"دخول"}</button><p id="demoNotice" role="status" style="color:#91a3b8"></p>`);document.getElementById("demoSubmit").onclick=()=>{const email=document.getElementById("demoEmail");if(!email.reportValidity())return;document.getElementById("demoNotice").textContent="تم التحقق من البريد في العرض فقط؛ لم يتم إنشاء حساب أو إرسال بيانات."}}
document.getElementById("joinBtn").onclick=()=>demoAccount("join");
document.getElementById("loginBtn").onclick=()=>demoAccount("login");
document.getElementById("ctaBtn").onclick=()=>demoAccount("join");
document.getElementById("aiBtn").onclick=()=>openModal("AI Hub",`<p style="color:#91a3b8">اكتب مسودة قصيرة لتحصل على مثال محلي لتقسيمها إلى خطوات. لا يتصل هذا النموذج بخدمة ذكاء اصطناعي.</p><label for="aiPrompt">المهمة</label><textarea id="aiPrompt" rows="4" maxlength="500" placeholder="مثال: أريد إطلاق متجر قهوة..."></textarea><button class="primary" id="aiRun">إنشاء خطة تجريبية</button><div id="aiResult" role="status"></div>`); 
document.getElementById("modal").addEventListener("click",e=>{if(e.target.id==="aiRun"){const prompt=document.getElementById("aiPrompt").value.trim();const out=document.getElementById("aiResult");out.textContent=prompt?"خطة بداية: حدّد جمهورك، اختر خدمة مناسبة، ثم اكتب موجزًا واضحًا للمشروع.":"اكتب المهمة أولًا."}});
document.getElementById("searchBtn").onclick=()=>{const q=document.getElementById("heroSearch").value.trim();activeCategory="";const count=renderTalents(q);document.getElementById("talent").scrollIntoView({behavior:"smooth"});if(!q)openModal("ابحث عن خدمة",'<p style="color:#91a3b8">اكتب مهارة أو خدمة في مربع البحث لتصفية المواهب.</p>');else if(!count)openModal("لا توجد نتائج",`<p>لم نجد موهبة تطابق «${escapeHtml(q)}». جرّب: تصميم، برمجة، فيديو أو كتابة.</p>`);};
document.getElementById("heroSearch").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();document.getElementById("searchBtn").click()}});
document.querySelectorAll(".chips button").forEach(b=>b.onclick=()=>{document.getElementById("heroSearch").value=b.textContent;document.getElementById("searchBtn").click()});
document.querySelectorAll("[data-view]").forEach(a=>a.addEventListener("click",e=>{const v=a.dataset.view;const target={marketplace:"marketplace",talent:"talent",ai:"ai",how:"how",home:"home"}[v];if(target){e.preventDefault();document.getElementById(target).scrollIntoView({behavior:"smooth"})}}));
document.querySelectorAll(".category").forEach(b=>b.onclick=()=>{activeCategory=b.dataset.cat||"";document.getElementById("heroSearch").value="";renderTalents();document.getElementById("talent").scrollIntoView({behavior:"smooth"})});
document.getElementById("langBtn").onclick=()=>openModal("English version",'<p style="color:#91a3b8">واجهة المتجر عربية حاليًا. تبديل اللغة الكامل غير متاح في هذه النسخة.</p>');
renderTalents();
