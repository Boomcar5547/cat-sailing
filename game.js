// --- 1. 深度扩充版港口数据库 (V0.375) ---
const portsData = {
    // 【东亚区域 - 精简历史逻辑版】
    "杭州": { x: 800, y: 550, region: "东亚", isBig: true, goods: [{n:"丝绸",p:750,u:true},{n:"陶瓷器",p:400,u:true},{n:"麝香",p:1100,u:false}] },
    "双屿": { x: 812, y: 558, region: "东亚", isBig: false, goods: [{n:"生丝",p:500,u:true}] }, // 宁波外海的走私圣地
    "泉州": { x: 792, y: 582, region: "东亚", isBig: false, goods: [{n:"茶叶",p:300,u:true}] },
    "濠镜": { x: 778, y: 602, region: "东亚", isBig: false, goods: [{n:"南瓜",p:80,u:true}] }, // 澳门前身
    "登州": { x: 815, y: 505, region: "东亚", isBig: false, goods: [{n:"豆类",p:100,u:true}] },
    "京城": { x: 845, y: 495, region: "东亚", isBig: true, goods: [{n:"人参",p:800,u:true}] }, // 沿袭DK4习惯，指朝鲜半岛汉城
    "长崎": { x: 890, y: 530, region: "东亚", isBig: true, goods: [{n:"银",p:550,u:true},{n:"漆器",p:350,u:true}] },
    "大阪": { x: 915, y: 538, region: "东亚", isBig: true, goods: [{n:"清酒",p:200,u:true}] },
    "那霸": { x: 885, y: 585, region: "东亚", isBig: false, goods: [{n:"砂糖",p:120,u:true}] },

    // 【地中海 - 极高密度扩充】
    "里斯本": { x: 100, y: 500, region: "地中海", isBig: true, goods: [{n:"岩盐",p:120,u:true},{n:"藏红花",p:680,u:false}] },
    "法鲁": { x: 108, y: 512, region: "地中海", isBig: false, goods: [{n:"鱼肉",p:80,u:true}] },
    "塞维利亚": { x: 115, y: 520, region: "地中海", isBig: true, goods: [{n:"陶瓷器",p:280,u:true},{n:"葡萄酒",p:180,u:true}] },
    "休达": { x: 110, y: 535, region: "地中海", isBig: false, goods: [{n:"象牙",p:400,u:true}] },
    "马加拉": { x: 125, y: 525, region: "地中海", isBig: false, goods: [{n:"葡萄",p:110,u:true}] },
    "巴伦西亚": { x: 138, y: 508, region: "地中海", isBig: false, goods: [{n:"毛织品",p:250,u:true}] },
    "巴塞罗那": { x: 152, y: 502, region: "地中海", isBig: true, goods: [{n:"食盐",p:100,u:true}] },
    "帕尔马": { x: 158, y: 515, region: "地中海", isBig: false, goods: [{n:"杏仁",p:150,u:true}] },
    "阿尔及尔": { x: 145, y: 532, region: "地中海", isBig: false, goods: [{n:"朗姆酒",p:210,u:true}] },
    "马赛": { x: 170, y: 480, region: "地中海", isBig: true, goods: [{n:"香水",p:300,u:true}] },
    "热那亚": { x: 185, y: 475, region: "地中海", isBig: true, goods: [{n:"银制品",p:450,u:true}] },
    "皮萨": { x: 192, y: 485, region: "地中海", isBig: false, goods: [{n:"刺绣",p:380,u:true}] },
    "威尼斯": { x: 210, y: 465, region: "地中海", isBig: true, goods: [{n:"水晶",p:500,u:true}] },
    "那不勒斯": { x: 205, y: 500, region: "地中海", isBig: false, goods: [{n:"玻璃",p:320,u:true}] },
    "突尼斯": { x: 180, y: 535, region: "地中海", isBig: false, goods: [{n:"铁矿石",p:150,u:true}] },
    "的黎波里": { x: 215, y: 555, region: "地中海", isBig: false, goods: [{n:"黄金",p:1500,u:false}] },
    "伊拉克利翁": { x: 268, y: 525, region: "地中海", isBig: false, goods: [{n:"橄榄油",p:180,u:true}] },
    "伊斯坦布尔": { x: 290, y: 485, region: "地中海", isBig: true, goods: [{n:"绒毯",p:600,u:true}] },
    "亚历山大": { x: 285, y: 550, region: "地中海", isBig: true, goods: [{n:"胡椒",p:600,u:true}] },
    "塞浦路斯": { x: 305, y: 520, region: "地中海", isBig: false, goods: [{n:"葡萄酒",p:210,u:true}] },
    "雅法": { x: 320, y: 540, region: "地中海", isBig: false, goods: [{n:"皮革",p:180,u:true}] },

    // 【北海 & 波罗的海 - 极高密度扩充】
    "伦敦": { x: 110, y: 400, region: "北海", isBig: true, goods: [{n:"羊毛",p:140,u:true},{n:"大炮",p:1200,u:false}] },
    "南安普顿": { x: 105, y: 410, region: "北海", isBig: false, goods: [{n:"铁具",p:150,u:true}] },
    "普利茅斯": { x: 92, y: 415, region: "北海", isBig: false, goods: [{n:"锡",p:260,u:true}] },
    "布里斯托尔": { x: 98, y: 405, region: "北海", isBig: false, goods: [{n:"牛肉",p:120,u:true}] },
    "爱丁堡": { x: 100, y: 360, region: "北海", isBig: false, goods: [{n:"煤炭",p:130,u:true}] },
    "都柏林": { x: 80, y: 390, region: "北海", isBig: false, goods: [{n:"威士忌",p:200,u:true}] },
    "阿姆斯特丹": { x: 135, y: 405, region: "北海", isBig: true, goods: [{n:"玻璃",p:350,u:true},{n:"奶酪",p:100,u:true}] },
    "安特卫普": { x: 132, y: 412, region: "北海", isBig: false, goods: [{n:"花边",p:380,u:true}] },
    "格罗宁根": { x: 142, y: 395, region: "北海", isBig: false, goods: [{n:"大麻",p:110,u:true}] },
    "汉堡": { x: 162, y: 398, region: "北海", isBig: true, goods: [{n:"铁矿石",p:180,u:true}] },
    "不来梅": { x: 155, y: 405, region: "北海", isBig: false, goods: [{n:"黑麦",p:90,u:true}] },
    "哥本哈根": { x: 182, y: 380, region: "北海", isBig: false, goods: [{n:"玻璃",p:300,u:true}] },
    "吕贝克": { x: 168, y: 388, region: "北海", isBig: false, goods: [{n:"银制品",p:400,u:true}] },
    "维斯比": { x: 210, y: 365, region: "北海", isBig: false, goods: [{n:"蜂蜜",p:110,u:true}] },
    "斯德哥尔摩": { x: 215, y: 345, region: "北海", isBig: true, goods: [{n:"木材",p:120,u:true}] },
    "奥斯陆": { x: 178, y: 350, region: "北海", isBig: false, goods: [{n:"甲胄",p:550,u:true}] },
    "里加": { x: 235, y: 365, region: "北海", isBig: false, goods: [{n:"琥珀",p:450,u:true}] },
    "但泽": { x: 205, y: 382, region: "北海", isBig: false, goods: [{n:"麦子",p:95,u:true}] },
    "纳尔瓦": { x: 255, y: 350, region: "北海", isBig: false, goods: [{n:"毛皮",p:500,u:true}] },
    "圣彼得堡": { x: 275, y: 340, region: "北海", isBig: true, goods: [{n:"蜂蜜",p:150,u:true}] }
};

let player = {
    money: 3000, supply: 50, hull: 100, sailors: 10,
    currentPort: "里斯本", lastPort: "",
    favors: {}, inventory: [], history: ["【空】"]
};

const changelogs = [
    "V0.42: 彻底修复界面重叠鬼影；重写 Screen 切换逻辑；修复按钮响应失效BUG；优化日志显示。",
    "V0.41: 初始金币上调至3000；修复酒馆按钮丢失；日志下沉至交互区。",
    "V0.375: 移除南京，修正东亚港口历史逻辑。",
    "V0.3: 引入防横跳航行算法，实装沉浸式弹窗。"
];

// --- 核心切换逻辑 ---
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if(target) target.classList.add('active');
}

function showFactions() {
    showScreen('faction-screen');
    const grid = document.getElementById('faction-list');
    grid.innerHTML = '';
    const facs = [
        {n:'西班牙',c:'#ff4757',p:'塞维利亚'}, 
        {n:'葡萄牙',c:'#2ed573',p:'里斯本'}, 
        {n:'大明',c:'#eb4d4b',p:'杭州'}, 
        {n:'英格兰',c:'#70a1ff',p:'伦敦'}
    ];
    facs.forEach(f => {
        const b = document.createElement('div');
        b.className = 'pixel-btn';
        b.style.background = f.c;
        b.innerHTML = `🐱<br>${f.n}`;
        b.onclick = () => {
            player.faction = f.n;
            player.currentPort = f.p;
            startGame();
        };
        grid.appendChild(b);
    });
}

function startGame() {
    updatePortUI();
    showScreen('port-screen');
    addLog(`欢迎，${player.faction}的猫猫船长！`);
}

function updatePortUI() {
    document.getElementById('display-port-name').innerText = player.currentPort;
    document.getElementById('display-money').innerText = `￥${player.money}`;
    const port = portsData[player.currentPort] || {isBig: false};
    document.getElementById('btn-shipyard').style.display = port.isBig ? 'block' : 'none';
    document.getElementById('btn-repair').style.display = port.isBig ? 'block' : 'none';
}

function openModule(type) {
    const subWin = document.getElementById('sub-window');
    const content = document.getElementById('sub-window-content');
    const title = document.getElementById('sub-window-title');
    subWin.classList.add('modal-show');
    content.innerHTML = '';

    if (type === 'market') {
        title.innerText = "市场 - " + player.currentPort;
        portsData[player.currentPort].goods.forEach(g => {
            const b = document.createElement('div'); b.className = 'pixel-btn';
            b.innerHTML = g.u ? `${g.n}<br>￥${g.p}` : `🔒${g.n}`;
            b.onclick = () => {
                if(g.u && player.money >= g.p) {
                    player.money -= g.p; player.inventory.push({n:g.n, p:g.p});
                    addLog(`买入 ${g.n}(-￥${g.p})`); updatePortUI();
                } else if(g.u) catAlert("金币不足！");
            };
            content.appendChild(b);
        });
    } else if (type === 'tavern') {
        title.innerText = "酒馆 - " + player.currentPort;
        if(!player.favors[player.currentPort]) player.favors[player.currentPort] = 0;
        
        const createBtn = (txt, fn) => {
            const b = document.createElement('div'); b.className='pixel-btn'; b.innerText=txt; b.onclick=fn; content.appendChild(b);
        };
        createBtn("招募水手(￥100)", () => {
            if(player.money>=100){ player.money-=100; player.sailors+=5; addLog("招募了5名海猫水手。"); updatePortUI(); }
        });
        createBtn("调戏侍女", () => {
            if(player.favors[player.currentPort]>=100) catAlert("侍女：'既然你这么诚心... vivo 50 解锁动态CG！'");
            else catAlert("不可以哦，旮旯给木里不是这样的哦\n(好感度: " + player.favors[player.currentPort] + "/100)");
        });
    } else if (type === 'items') {
        title.innerText = "货舱 (清仓卖出)";
        if(player.inventory.length === 0) content.innerHTML = "货舱是空的喵。";
        else {
            const b = document.createElement('div'); b.className='pixel-btn'; b.style.background='var(--btn-yellow)'; b.style.width='100%';
            b.innerText = `全部清仓 (预估回笼 ￥${Math.floor(player.inventory.reduce((a,b)=>a+b.p,0)*1.3)})`;
            b.onclick = () => {
                let gain = 0;
                player.inventory.forEach(i => gain += Math.floor(i.p * (1.2 + Math.random()*0.3)));
                player.money += gain; addLog(`清仓成功，获得金币 ￥${gain}`);
                player.inventory = []; updatePortUI(); openModule('items');
            };
            content.appendChild(b);
        }
    }
}

function closeModule() {
    document.getElementById('sub-window').classList.remove('modal-show');
}

function addLog(msg) {
    const l = document.getElementById('log-area');
    l.innerHTML = `<div>> ${msg}</div>` + l.innerHTML;
}

function catAlert(html) {
    const m = document.getElementById('game-modal');
    document.getElementById('modal-body').innerHTML = html;
    m.style.display = 'flex';
    document.getElementById('modal-ok-btn').onclick = () => m.style.display = 'none';
}

function showBigChangelog() {
    let html = changelogs.map(l => `• ${l}<br><br>`).join('');
    catAlert(html);
}

// 航行与存档逻辑
function saveGame() { localStorage.setItem('bigcat_save', JSON.stringify(player)); addLog("保存成功。"); }
function loadGame() { 
    const d = localStorage.getItem('bigcat_save'); 
    if(d) { player = JSON.parse(d); updatePortUI(); showScreen('port-screen'); addLog("读取成功。"); } 
    else catAlert("没存档喵。");
}

function handleSupply() { if(player.money>=50){ player.money-=50; player.supply+=20; updatePortUI(); addLog("补给鱼干。"); } }
function handleRepair() { if(player.money>=100){ player.money-=100; player.hull=100; updatePortUI(); catAlert("修好了！"); } }

// 初始化
updatePortUI();
let player = {
    money: 3000,
    supply: 50,
    hull: 100,
    sailors: 10,
    currentPort: "里斯本",
    lastPort: "",
    favors: {},
    inventory: [],
    history: ["【空】"]
};

const changelogs = [
    "V0.41: 修复酒馆招募水手按钮丢失BUG；优化日志刷新机制。",
    "V0.4: 实装贸易卖出系统；重构UI布局，日志下沉至白色区域；初始金币3000；修复重影。",
    "V0.375: 移除南京，保留双屿/京城；补充地中海/北海港口至40+。",
    "V0.36: 修正杭州丝绸产地错误；完善东亚港口布局。",
    "V0.35: 引入坐标系统与地理距离逻辑；基于距离的补给消耗实装。",
    "V0.3: 引入防横跳算法；实装沉浸式弹窗与侍女好感检定。"
];

function showBigChangelog() {
    let content = changelogs.map(line => `• ${line}<br><br>`).join('');
    catAlert(content);
}

function updatePortUI() {
    document.getElementById('display-port-name').innerText = player.currentPort;
    document.getElementById('display-money').innerText = `￥${player.money}`;
    const port = portsData[player.currentPort] || {isBig: false};
    document.getElementById('btn-shipyard').style.display = port.isBig ? 'block' : 'none';
    document.getElementById('btn-repair').style.display = port.isBig ? 'block' : 'none';
}

function openModule(type) {
    const content = document.getElementById('sub-window-content');
    const title = document.getElementById('sub-window-title');
    content.innerHTML = '';

    if (type === 'market') {
        title.innerText = "市场 - " + player.currentPort;
        portsData[player.currentPort].goods.forEach(g => {
            const btn = document.createElement('div');
            btn.className = 'pixel-btn';
            btn.innerHTML = g.u ? `${g.n}<br>￥${g.p}` : `🔒${g.n}`;
            btn.onclick = () => {
                if(g.u && player.money >= g.p) {
                    player.money -= g.p;
                    player.inventory.push({n: g.n, p: g.p});
                    addLog(`买入 ${g.n}，花费 ￥${g.p}`);
                    updatePortUI();
                } else if(g.u) catAlert("金币不足喵！");
            };
            content.appendChild(btn);
        });
    } else if (type === 'tavern') {
        title.innerText = "酒馆 - " + player.currentPort;
        if (!player.favors[player.currentPort]) player.favors[player.currentPort] = 0;
        
        // 招募按钮
        const btnRecruit = document.createElement('div');
        btnRecruit.className = 'pixel-btn';
        btnRecruit.innerText = "招募水手 (￥100)";
        btnRecruit.onclick = () => {
            if(player.money >= 100) {
                player.money -= 100; player.sailors += 5;
                addLog("在酒馆招募了5名猫猫水手。"); updatePortUI();
            } else catAlert("钱不够。");
        };
        // 请喝奶
        const btnMilk = document.createElement('div');
        btnMilk.className = 'pixel-btn';
        btnMilk.innerText = "请全场喝奶 (￥50)";
        btnMilk.onclick = () => {
            if(player.money >= 50) {
                player.money -= 50; player.favors[player.currentPort] += 20;
                addLog("名声大涨！侍女脸红了。"); updatePortUI();
            }
        };
        // 调戏
        const btnGirl = document.createElement('div');
        btnGirl.className = 'pixel-btn';
        btnGirl.innerText = "调戏侍女";
        btnGirl.onclick = () => {
            if(player.favors[player.currentPort] >= 100) catAlert("侍女：'既然你这么诚心... vivo 50 解锁动态CG！'");
            else catAlert("不可以哦，旮旯给木里不是这样的哦\n(好感度不足: " + player.favors[player.currentPort] + "/100)");
        };

        content.appendChild(btnRecruit);
        content.appendChild(btnMilk);
        content.appendChild(btnGirl);
    } else if (type === 'items') {
        title.innerText = "货舱 (清空卖出)";
        if(player.inventory.length === 0) content.innerHTML = "空空如也。";
        else {
            const sellBtn = document.createElement('div');
            sellBtn.className = 'pixel-btn';
            sellBtn.style.background = 'var(--btn-yellow)';
            sellBtn.style.width = '100%';
            sellBtn.innerText = `全部卖出 (预计利润约 30%)`;
            sellBtn.onclick = () => {
                let gain = 0;
                player.inventory.forEach(i => gain += Math.floor(i.p * (1.2 + Math.random()*0.2)));
                player.money += gain;
                addLog(`卖出全部货物，获得金币 ￥${gain}`);
                player.inventory = [];
                updatePortUI(); openModule('items');
            };
            content.appendChild(sellBtn);
        }
    }
}

function catAlert(msg) {
    const modal = document.getElementById('game-modal');
    document.getElementById('modal-body').innerHTML = msg;
    modal.style.display = 'flex';
    document.getElementById('modal-ok-btn').onclick = () => modal.style.display = 'none';
}

function addLog(msg) {
    const logArea = document.getElementById('log-area');
    logArea.innerHTML = `<div>> ${msg}</div>` + logArea.innerHTML;
}

function calcDist(p1, p2) {
    const d1 = portsData[p1], d2 = portsData[p2];
    return Math.sqrt(Math.pow(d1.x - d2.x, 2) + Math.pow(d1.y - d2.y, 2));
}

function handleDepart() {
    if (player.supply <= 0) return catAlert("补给不足！");
    showDepartMenu();
}

function showDepartMenu() {
    const content = document.getElementById('sub-window-content');
    const title = document.getElementById('sub-window-title');
    document.getElementById('sub-window').className = 'modal-hidden modal-show';
    title.innerText = "选择目的地";
    content.innerHTML = '';

    player.history.forEach(h => {
        if(h !== "【空】" && h !== player.currentPort) {
            const b = document.createElement('div'); b.className = 'pixel-btn';
            b.innerText = h; b.onclick = () => sailTo(h);
            content.appendChild(b);
        }
    });
    const xjb = document.createElement('div');
    xjb.className = 'pixel-btn'; xjb.style.background = 'var(--btn-yellow)';
    xjb.innerText = "XJB探索";
    xjb.onclick = () => {
        const possible = Object.keys(portsData).filter(p => p !== player.currentPort && p !== player.lastPort);
        let closest = possible.sort((a,b) => calcDist(player.currentPort, a) - calcDist(player.currentPort, b))[0];
        sailTo(closest);
    };
    content.appendChild(xjb);
}

function sailTo(dest) {
    const dist = calcDist(player.currentPort, dest);
    const cost = Math.ceil(dist / 15);
    if(player.supply < cost) return catAlert("补给不足航行至此。");
    closeModule();
    addLog(`扬帆！目标 [${dest}]`);
    player.supply -= cost;
    setTimeout(() => {
        player.lastPort = player.currentPort;
        player.currentPort = dest;
        if(!player.history.includes(dest)) player.history.unshift(dest);
        updatePortUI(); catAlert(`抵达了 ${dest}！`);
    }, 1000);
}

function handleSupply() { if(player.money >= 50) { player.money -= 50; player.supply += 20; updatePortUI(); addLog("补给鱼干。"); } }
function handleRepair() { if(player.money >= 100) { player.money -= 100; player.hull = 100; updatePortUI(); catAlert("修理完毕。"); } }
function closeModule() { document.getElementById('sub-window').className = 'modal-hidden'; }
function saveGame() { localStorage.setItem('bigcat_save', JSON.stringify(player)); addLog("存档成功。"); }
function loadGame() { 
    const d = localStorage.getItem('bigcat_save'); 
    if(d) { player = JSON.parse(d); updatePortUI(); document.getElementById('port-screen').className = 'screen active'; addLog("读档成功。"); } 
}
updatePortUI();