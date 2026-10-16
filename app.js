const talents=[
 {id:"sara",n:"سارة العلوي",r:"مصممة UI/UX",v:"س",p:"$35 / ساعة",cat:"design",projects:84},
 {id:"youssef",n:"يوسف بناني",r:"Full-stack Developer",v:"ي",p:"$42 / ساعة",cat:"dev",projects:92},
 {id:"maryam",n:"مريم آيت",r:"كاتبة ومختصة SEO",v:"م",p:"$25 / ساعة",cat:"writing",projects:76},
 {id:"adam",n:"آدم رشيد",r:"Video & Motion Designer",v:"أ",p:"$38 / ساعة",cat:"video",projects:81}
];
const categoryNames={design:"التصميم",dev:"البرمجة",marketing:"التسويق",video:"الفيديو",writing:"الكتابة",business:"الأعمال"};

const services=[
 {id:"s1",title:"تصميم شعار وهوية بصرية",cat:"design",provider:"سارة العلوي",price:"$120",days:4,rating:"4.9",desc:"شعار أصلي مع ألوان وخطوط أساسية تناسب مشروعك."},
 {id:"s2",title:"تصميم واجهة متجر إلكتروني",cat:"design",provider:"سارة العلوي",price:"$180",days:6,rating:"4.8",desc:"واجهة واضحة ومتجاوبة لصفحات متجرك الأساسية."},
 {id:"s3",title:"تطوير صفحة هبوط سريعة",cat:"dev",provider:"يوسف بناني",price:"$240",days:5,rating:"5.0",desc:"صفحة هبوط متجاوبة مع أقسام قابلة للتخصيص."},
 {id:"s4",title:"إعداد متجر إلكتروني أولي",cat:"dev",provider:"يوسف بناني",price:"$420",days:9,rating:"4.9",desc:"واجهة متجر تجريبية مع صفحات المنتجات والسلة."},
 {id:"s5",title:"تحسين SEO لصفحة واحدة",cat:"marketing",provider:"مريم آيت",price:"$75",days:3,rating:"4.9",desc:"مراجعة بنية الصفحة والعناوين ووصف نتائج البحث."},
 {id:"s6",title:"خطة محتوى لشهر كامل",cat:"marketing",provider:"مريم آيت",price:"$95",days:4,rating:"4.8",desc:"تقويم أفكار ومنشورات قابل للتنفيذ لقنواتك."},
 {id:"s7",title:"مونتاج فيديو قصير",cat:"video",provider:"آدم رشيد",price:"$65",days:3,rating:"4.9",desc:"تحرير فيديو عمودي مع عناوين وانتقالات أساسية."},
 {id:"s8",title:"موشن جرافيك إعلاني",cat:"video",provider:"آدم رشيد",price:"$145",days:5,rating:"4.8",desc:"مقطع موشن قصير يشرح عرضك أو منتجك."},
 {id:"s9",title:"كتابة وصف منتجات",cat:"writing",provider:"مريم آيت",price:"$45",days:2,rating:"4.9",desc:"أوصاف مختصرة وواضحة لخمسة منتجات."},
 {id:"s10",title:"ترجمة صفحة إلى الإنجليزية",cat:"writing",provider:"مريم آيت",price:"$55",days:3,rating:"4.8",desc:"ترجمة ومراجعة لغوية لمحتوى صفحة واحدة."},
 {id:"s11",title:"مراجعة فكرة مشروع",cat:"business",provider:"يوسف بناني",price:"$80",days:3,rating:"4.7",desc:"ملاحظات حول الجمهور والقيمة وخطوة الإطلاق."},
 {id:"s12",title:"لوحة متابعة مبسطة",cat:"business",provider:"سارة العلوي",price:"$110",days:4,rating:"4.8",desc:"تصميم لوحة مؤشرات أولية لمتابعة أهداف العمل."}
];
const serviceGrid=document.getElementById("serviceGrid");
const resultCount=document.getElementById("resultCount");
const savedServicesKey="store-world-saved-services-v1";
let savedServices=new Set();
try{savedServices=new Set(JSON.parse(localStorage.getItem(savedServicesKey)||"[]"))}catch{}
const grid=document.getElementById("talentGrid");
const modal=document.getElementById("modal"),content=document.getElementById("modalContent");
const savedKey="store-world-saved-talent-v1";
let saved=new Set();
try{saved=new Set(JSON.parse(localStorage.getItem(savedKey)||"[]"))}catch{}
let activeCategory="";
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}

function renderServices(query=""){
 const q=query.trim().toLocaleLowerCase("ar");
 const results=services.filter(s=>(!activeCategory||s.cat===activeCategory)&&(!q||[s.title,s.provider,categoryNames[s.cat],s.desc].some(v=>v.toLocaleLowerCase("ar").includes(q))));
 serviceGrid.innerHTML=results.map(s=>'<article class="service-listing"><div class="listing-top"><span class="listing-category">'+categoryNames[s.cat]+'</span><button class="save-talent" data-save-service="'+s.id+'" aria-label="حفظ الخدمة" aria-pressed="'+savedServices.has(s.id)+'">'+(savedServices.has(s.id)?'♥':'♡')+'</button></div><h3>'+escapeHtml(s.title)+'</h3><p>'+escapeHtml(s.desc)+'</p><div class="listing-meta"><span>◉ '+escapeHtml(s.provider)+'</span><span>★ '+s.rating+'</span><span>'+s.days+' أيام</span></div><div class="listing-bottom"><b>من '+s.price+'</b><button class="outline listing-action" data-service="'+s.id+'">التفاصيل</button></div></article>').join("");
 if(!results.length)serviceGrid.innerHTML='<p class="empty-results">لا توجد خدمات مطابقة لهذه الكلمات أو الفئة.</p>';
 resultCount.textContent=results.length+" خدمة";
 serviceGrid.querySelectorAll("[data-save-service]").forEach(b=>b.addEventListener("click",()=>{const id=b.dataset.saveService;savedServices.has(id)?savedServices.delete(id):savedServices.add(id);localStorage.setItem(savedServicesKey,JSON.stringify([...savedServices]));renderMarketplace(query)}));
 serviceGrid.querySelectorAll("[data-service]").forEach(b=>b.addEventListener("click",()=>{const s=services.find(x=>x.id===b.dataset.service);if(!s)return;openModal(s.title,'<p>'+escapeHtml(s.desc)+'</p><p><b>مقدم الخدمة:</b> '+escapeHtml(s.provider)+' · <b>السعر يبدأ من:</b> '+s.price+' · <b>التسليم:</b> '+s.days+' أيام</p><button class="primary" id="requestService">طلب هذه الخدمة</button><p style="color:#91a3b8">الطلب تجريبي؛ لا توجد حسابات أو مدفوعات متصلة.</p>');document.getElementById("requestService").onclick=()=>demoAccount("join")}));
 return results.length;
}
function renderMarketplace(query=""){return renderServices(query)+renderTalents(query)}
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
document.getElementById("searchBtn").onclick=()=>{const q=document.getElementById("heroSearch").value.trim();activeCategory="";const count=renderMarketplace(q);document.getElementById("marketplace").scrollIntoView({behavior:"smooth"});if(!q)openModal("ابحث عن خدمة",'<p style="color:#91a3b8">اكتب مهارة أو خدمة في مربع البحث لتصفية الخدمات والمواهب.</p>');else if(!count)openModal("لا توجد نتائج",`<p>لم نجد خدمة أو موهبة تطابق «${escapeHtml(q)}». جرّب: تصميم، برمجة، فيديو أو كتابة.</p>`);};
document.getElementById("heroSearch").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();document.getElementById("searchBtn").click()}});
document.querySelectorAll(".chips button").forEach(b=>b.onclick=()=>{document.getElementById("heroSearch").value=b.textContent;document.getElementById("searchBtn").click()});
document.querySelectorAll("[data-view]").forEach(a=>a.addEventListener("click",e=>{const v=a.dataset.view;const target={marketplace:"marketplace",talent:"talent",ai:"ai",how:"how",home:"home"}[v];if(target){e.preventDefault();document.getElementById(target).scrollIntoView({behavior:"smooth"})}}));
document.querySelectorAll(".category").forEach(b=>b.onclick=()=>{activeCategory=b.dataset.cat||"";document.getElementById("heroSearch").value="";renderMarketplace();document.getElementById("marketplace").scrollIntoView({behavior:"smooth"})});
document.getElementById("langBtn").onclick=()=>openModal("English version",'<p style="color:#91a3b8">واجهة المتجر عربية حاليًا. تبديل اللغة الكامل غير متاح في هذه النسخة.</p>');
renderMarketplace();
