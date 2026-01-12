// --- 1. 港口数据 ---
const portsData = {
    "里斯本": { region: "地中海", isBig: true, goods: [{n:"岩盐",p:120,u:true},{n:"木材",p:150,u:true},{n:"藏红花",p:680,u:false}] },
    "塞维利亚": { region: "地中海", isBig: true, goods: [{n:"陶瓷器",p:280,u:true},{n:"葡萄酒",p:180,u:true},{n:"天鹅绒",p:520,u:false}] },
    "伦敦": { region: "北海", isBig: true, goods: [{n:"羊毛",p:140,u:true},{n:"大炮",p:1200,u:false},{n:"煤炭",p:200,u:true}] },
    "杭州": { region: "东亚", isBig: true, goods: [{n:"丝绸",p:750,u:true},{n:"陶瓷器",p:400,u:true},{n:"麝香",p:1100,u:false}] },
    "长崎": { region: "东亚", isBig: true, goods: [{n:"银",p:500,u:true},{n:"漆器",p:350,u:true},{n:"刀剑",p:900,u:false}] },
    "伊斯坦布尔": { region: "地中海", isBig: true, goods: [{n:"硫磺",p:220,u:true},{n:"绒毯",p:600,u:true},{n:"骨董品",p:1300,u:false}] }
};

// --- 2. 初始玩家数据 ---
let player = {
    name: "大猫船长", faction: "", level: 1, money: 1000,
    supply: 20, hull: 100, sailors: 10, 
    currentPort: "里斯本", 
    lastPort: "", // 用于防止来回横跳
    favors: {}, // 侍女好感度
    inventory: [], 
    history: ["【空】", "【空】", "【空】", "【空】", "【空】", "【空】"]
};

// --- 3. UI 弹窗系统 ---
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

// --- 4. 核心逻辑 ---
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
        div.onclick = () => { 
            player.faction = f.n; player.currentPort = f.p; 
            updatePortUI(); showScreen('port-screen'); 
            addLog(`开启了${f.n}的航程！`); 
        };
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
        const port = portsData[player.currentPort];
        port.goods.forEach(g => {
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
                addLog("全场猫猫欢呼！侍女好感度提升。"); updatePortUI();
            } else { catAlert("钱不够买奶了。"); }
        };
        
        const btnGirl = document.createElement('div');
        btnGirl.className = 'pixel-btn';
        btnGirl.innerText = "调戏侍女";
        btnGirl.onclick = () => {
            if(player.favors[player.currentPort] >= 100) {
                catAlert("侍女脸红了：'既然你这么诚心... vivo 50 解锁动态CG！'");
            } else {
                catAlert("侍女翻了个白眼：'不可以哦，旮旯给木里不是这样的哦（好感度不足：" + player.favors[player.currentPort] + "/100）'");
            }
        };

        content.appendChild(btnMilk);
        content.appendChild(btnGirl);
    } else {
        content.innerHTML = `<p style="text-align:center;padding:20px;">[${type}] 模块还在装修中...</p>`;
    }
}

function handleDepart() {
    if (player.supply <= 0) return catAlert("补给不足！小猫会饿死的！");
    if (player.hull < 50) {
        catConfirm("船体破损，是否强行出航？", () => showDepartMenu());
    } else { showDepartMenu(); }
}

function showDepartMenu() {
    const win = document.getElementById('sub-window');
    const content = document.getElementById('sub-window-content');
    const title = document.getElementById('sub-window-title');
    win.className = 'modal-hidden modal-show';
    title.innerText = "请选择目的地";
    content.innerHTML = '';

    player.history.forEach((h, i) => {
        const btn = document.createElement('div');
        btn.className = 'pixel-btn';
        btn.innerText = `${i+1}. ${h}`;
        if(h !== "【空】" && h !== player.currentPort) btn.onclick = () => sailTo(h);
        content.appendChild(btn);
    });

    const xjb = document.createElement('div');
    xjb.className = 'pixel-btn'; xjb.style.background = 'var(--btn-yellow)';
    xjb.innerText = "7. XJB探索";
    xjb.onclick = () => {
        // 排除当前港口和上一个港口
        const possible = Object.keys(portsData).filter(p => p !== player.currentPort && p !== player.lastPort);
        const dest = possible[Math.floor(Math.random() * possible.length)];
        sailTo(dest);
    };
    content.appendChild(xjb);
}

function sailTo(dest) {
    closeModule();
    addLog(`离开 ${player.currentPort}，目标 [${dest}]...`);
    player.supply -= 5;
    player.hull -= Math.floor(Math.random() * 3);
    
    setTimeout(() => {
        player.lastPort = player.currentPort; // 记录离开的港口
        player.currentPort = dest;
        if (!player.history.includes(dest)) {
            player.history.unshift(dest);
            if (player.history.length > 6) player.history.pop();
        }
        updatePortUI();
        catAlert(`抵达了 ${dest}！`);
    }, 800);
}

function handleSupply() {
    if(player.money >= 50) { player.money -= 50; player.supply += 20; updatePortUI(); addLog("补给已满喵！"); }
}

function handleRepair() {
    if(player.money >= 100) { player.money -= 100; player.hull = 100; updatePortUI(); catAlert("修好了！"); }
}

function buyGoods(g) {
    if(player.money >= g.p) { player.money -= g.p; player.inventory.push(g.n); addLog(`买入 ${g.n}`); updatePortUI(); }
}

function closeModule() { document.getElementById('sub-window').className = 'modal-hidden'; }
function addLog(msg) {
    const log = document.getElementById('log-area');
    log.innerHTML += `<div>> ${msg}</div>`;
    log.scrollTop = log.scrollHeight;
}
function saveGame() { localStorage.setItem('bigcat_save', JSON.stringify(player)); addLog("存入猫砂盆成功。"); }
function loadGame() {
    const d = localStorage.getItem('bigcat_save');
    if(d) { player = JSON.parse(d); updatePortUI(); showScreen('port-screen'); addLog("读取成功。"); }
    else catAlert("没存档喵。");
}