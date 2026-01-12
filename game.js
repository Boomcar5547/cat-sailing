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

// --- 2. 玩家数据 ---
let player = {
    name: "大猫船长", faction: "", level: 1, money: 1000,
    supply: 20, hull: 100, sailors: 10, 
    currentPort: "里斯本", 
    lastPort: "", 
    favors: {}, // 记录侍女好感
    inventory: [], 
    history: ["【空】", "【空】", "【空】", "【空】", "【空】", "【空】"]
};

// --- 3. UI 系统 ---
function catAlert(msg, callback = null) {
    const modal = document.getElementById('game-modal');
    const body = document.getElementById('modal-body');
    const okBtn = document.getElementById('modal-ok-btn');
    const cancelBtn = document.getElementById('modal-cancel-btn');
    body.innerText = msg;
    cancelBtn.style.display = 'none';
    modal.style.display = 'flex';
    okBtn.onclick = () => { modal.style.display = 'none'; if(callback) callback(); };
}

function catConfirm(msg, onConfirm) {
    catAlert(msg, onConfirm);
    const cancelBtn = document.getElementById('modal-cancel-btn');
    cancelBtn.style.display = 'block';
    cancelBtn.onclick = () => { document.getElementById('game-modal').style.display = 'none'; };
}

// --- 4. 核心功能 ---
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function showFactions() {
    showScreen('faction-screen');
    const grid = document.getElementById('faction-list');
    grid.innerHTML = '';
    const factions = [
        {n:'西班牙',c:'#ff4757',p:'塞维利亚'}, {n:'葡萄牙',c:'#2ed573',p:'里斯本'},
        {n:'大明',c:'#eb4d4b',p:'杭州'}, {n:'英格兰',c:'#70a1ff',p:'伦敦'},
        {n:'奥斯曼',c:'#1dd1a1',p:'伊斯坦布尔'}, {n:'日本',c:'#f5f6fa',p:'长崎'}
    ];
    factions.forEach(f => {
        const div = document.createElement('div');
        div.className = 'pixel-btn';
        div.style.background = f.c;
        div.innerHTML = `🐱<br>${f.n}`;
        div.onclick = () => { player.faction = f.n; player.currentPort = f.p; updatePortUI(); showScreen('port-screen'); addLog(`开启了${f.n}的航程！`); };
        grid.appendChild(div);
    });
}

function updatePortUI() {
    const port = portsData[player.currentPort] || {isBig:false};
    document.getElementById('display-port-name').innerText = player.currentPort;
    document.getElementById('display-money').innerText = `金币：￥${player.money}`;
    document.getElementById('btn-shipyard').style.visibility = port.isBig ? 'visible' : 'hidden';
    document.getElementById('btn-repair').style.visibility = port.isBig ? 'visible' : 'hidden';
}

function openModule(type) {
    const win = document.getElementById('sub-window');
    const content = document.getElementById('sub-window-content');
    const title = document.getElementById('sub-window-title');
    win.className = 'modal-hidden modal-show';
    content.innerHTML = '';

    if (type === 'market') {
        title.innerText = "市场 - " + player.currentPort;
        portsData[player.currentPort].goods.forEach(g => {
            const btn = document.createElement('div');
            btn.className = 'pixel-btn';
            btn.style.textAlign = 'left';
            btn.innerHTML = g.u ? `🛒 ${g.n} <span style="float:right">￥${g.p}</span>` : `🔒 <span style="color:red">${g.n}(未解锁)</span>`;
            btn.onclick = () => { if(g.u) buyGoods(g); else catAlert("投资额不足！"); };
            content.appendChild(btn);
        });
    } else if (type === 'tavern') {
        title.innerText = "酒馆 - " + player.currentPort;
        if (!player.favors[player.currentPort]) player.favors[player.currentPort] = 0;
        
        const btnMilk = document.createElement('div');
        btnMilk.className = 'pixel-btn';
        btnMilk.innerText = "请大家喝奶 (￥50)";
        btnMilk.onclick = () => {
            if(player.money >= 50){
                player.money -= 50; player.favors[player.currentPort] += 20;
                addLog("名声上升了！侍女对你露出了微笑。"); updatePortUI();
            } else { catAlert("钱不够。"); }
        };
        
        const btnGirl = document.createElement('div');
        btnGirl.className = 'pixel-btn';
        btnGirl.innerText = "调戏侍女";
        btnGirl.onclick = () => {
            // 严格检定：好感度 100 为分界点
            if(player.favors[player.currentPort] >= 100) {
                catAlert("侍女红着脸小声说：'既然你这么诚心... vivo 50 解锁动态CG！'");
            } else {
                catAlert("不可以哦，旮旯给木里不是这样的哦\n(好感度不足：" + player.favors[player.currentPort] + "/100)");
            }
        };
        content.appendChild(btnMilk);
        content.appendChild(btnGirl);
    } else { content.innerHTML = `<p style="text-align:center;padding:20px;">模块装修中...</p>`; }
}

function handleDepart() {
    if (player.supply <= 0) return catAlert("补给为0，请先进行补给。小猫饿了会吃掉船长的！");
    if (player.hull < 50) catConfirm("船体受损严重，确认出港？", () => showDepartMenu());
    else showDepartMenu();
}

// 计算两个港口之间的直线距离
function calcDist(p1, p2) {
    if (!portsData[p1] || !portsData[p2]) return 999;
    const d1 = portsData[p1];
    const d2 = portsData[p2];
    return Math.sqrt(Math.pow(d1.x - d2.x, 2) + Math.pow(d1.y - d2.y, 2));
}

// 核心：出港目的地菜单逻辑
function showDepartMenu() {
    const win = document.getElementById('sub-window');
    const content = document.getElementById('sub-window-content');
    const title = document.getElementById('sub-window-title');
    win.className = 'modal-hidden modal-show';
    title.innerText = "请选择目的地";
    content.innerHTML = '';

    // 1. 显示历史港口 (仅限距离当前港口 500 单位以内的)
    player.history.forEach((h, i) => {
        if (h === "【空】" || h === player.currentPort) return;
        const dist = calcDist(player.currentPort, h);
        const btn = document.createElement('div');
        btn.className = 'pixel-btn';
        
        if (dist > 500) {
            btn.style.color = '#999';
            btn.innerHTML = `<span style="font-size:10px;">[过远]</span> ${h}`;
        } else {
            btn.innerText = `${h} (耗时约${Math.ceil(dist/10)}天)`;
            btn.onclick = () => sailTo(h);
        }
        content.appendChild(btn);
    });

    // 2. XJB探索按钮：只去最近的一个港口
    const xjb = document.createElement('div');
    xjb.className = 'pixel-btn';
    xjb.style.background = 'var(--btn-yellow)';
    xjb.innerText = "7. XJB探索 (寻找最近港口)";
    xjb.onclick = () => {
        let closest = null;
        let minDist = Infinity;
        
        Object.keys(portsData).forEach(p => {
            // 排除当前港口和上一个停留港口，防止反复横跳
            if (p !== player.currentPort && p !== player.lastPort) {
                let d = calcDist(player.currentPort, p);
                if (d < minDist) {
                    minDist = d;
                    closest = p;
                }
            }
        });

        if (closest) sailTo(closest);
        else catAlert("这片海域没猫了！");
    };
    content.appendChild(xjb);
}

// 核心：航行执行逻辑
function sailTo(dest) {
    const dist = calcDist(player.currentPort, dest);
    const supplyNeed = Math.max(1, Math.ceil(dist / 15)); // 每15单位消耗1补给

    if (player.supply < supplyNeed) {
        catAlert(`补给不足！\n航向 ${dest} 需要 ${supplyNeed} 份鱼干，你只有 ${player.supply} 份。`);
        return;
    }

    closeModule();
    addLog(`扬帆起航！离开 ${player.currentPort}，目标 [${dest}]。`);
    
    // 执行扣除
    player.supply -= supplyNeed;
    player.hull -= Math.floor(dist / 100); 

    // 模拟航行延迟
    setTimeout(() => {
        player.lastPort = player.currentPort; // 更新锚点
        player.currentPort = dest;
        
        // 维护历史记录
        if (!player.history.includes(dest)) {
            player.history.unshift(dest);
            if (player.history.length > 6) player.history.pop();
        }
        
        updatePortUI();
        catAlert(`抵达了 ${dest}！\n消耗补给：${supplyNeed}，船体磨损：${Math.floor(dist/100)}%`);
        addLog(`抵达港口 ${dest}。猫猫们迫不及待地跳进了水里。`);
    }, 1200);
}

function handleSupply() { if(player.money >= 50) { player.money -= 50; player.supply += 20; updatePortUI(); addLog("补给完成。"); } }
function handleRepair() { if(player.money >= 100) { player.money -= 100; player.hull = 100; updatePortUI(); catAlert("修好了！"); } }
function buyGoods(g) { if(player.money >= g.p) { player.money -= g.p; player.inventory.push(g.n); addLog(`买入 ${g.n}`); updatePortUI(); } }
function closeModule() { document.getElementById('sub-window').className = 'modal-hidden'; }
function addLog(msg) { const log = document.getElementById('log-area'); log.innerHTML += `<div>> ${msg}</div>`; log.scrollTop = log.scrollHeight; }
function saveGame() { localStorage.setItem('bigcat_save', JSON.stringify(player)); addLog("进度已存。"); }
function loadGame() { const d = localStorage.getItem('bigcat_save'); if(d) { player = JSON.parse(d); updatePortUI(); showScreen('port-screen'); addLog("读取成功。"); } else catAlert("无存档。"); }