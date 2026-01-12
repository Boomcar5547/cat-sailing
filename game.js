// --- 1. 复刻版港口数据库 ---
const portsData = {
    "里斯本": { region: "地中海", isBig: true, goods: [{n:"岩盐",p:120,u:true},{n:"木材",p:150,u:true},{n:"藏红花",p:680,u:false}] },
    "塞维利亚": { region: "地中 Mediterranean", isBig: true, goods: [{n:"陶瓷器",p:280,u:true},{n:"葡萄酒",p:180,u:true},{n:"天鹅绒",p:520,u:false}] },
    "伦敦": { region: "北海", isBig: true, goods: [{n:"羊毛",p:140,u:true},{n:"大炮",p:1200,u:false},{n:"煤炭",p:200,u:true}] },
    "杭州": { region: "东亚", isBig: true, goods: [{n:"丝绸",p:750,u:true},{n:"陶瓷器",p:400,u:true},{n:"麝香",p:1100,u:false}] },
    "长崎": { region: "东亚", isBig: true, goods: [{n:"银",p:500,u:true},{n:"漆器",p:350,u:true},{n:"刀剑",p:900,u:false}] }
};

// --- 2. 玩家对象 ---
let player = {
    name: "大猫船长", faction: "", level: 1, money: 1000,
    supply: 20, hull: 100, sailors: 10, currentPort: "里斯本",
    inventory: [], history: ["杭州", "伦敦", "【空】", "【空】", "【空】", "【空】"]
};

// --- 3. 核心UI弹窗系统 ---
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

// --- 4. 逻辑函数 ---
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
        const port = portsData[player.currentPort];
        if(!port) { content.innerHTML = "这个荒凉的港口没有市场。"; return; }
        port.goods.forEach(g => {
            const btn = document.createElement('div');
            btn.className = 'pixel-btn';
            btn.style.textAlign = 'left';
            btn.innerHTML = g.u ? `🛒 ${g.n} <span style="float:right">￥${g.p}</span>` : `🔒 <span style="color:red">${g.n}(未解锁)</span>`;
            btn.onclick = () => { if(g.u) buyGoods(g); else catAlert("商业投资额不足！"); };
            content.appendChild(btn);
        });
    } else if (type === 'tavern') {
        title.innerText = "酒馆 - 调戏...不，打听消息";
        const btns = [
            {t:"请全场猫喝奶 (￥50)", f:()=>addLog("名声上升了！")},
            {t:"招募水手", f:()=>addLog("招募了5只强壮的海猫。")},
            {t:"调戏侍女", f:()=>catAlert("不可以哦，旮旯给木里不是这样的哦（好感度不足）\n\n提示：vivo50解锁动态CG")}
        ];
        btns.forEach(b => {
            const d = document.createElement('div'); d.className='pixel-btn'; d.innerText=b.t; d.onclick=b.f; content.appendChild(d);
        });
    } else {
        content.innerHTML = `<p style="text-align:center;padding:20px;">[${type}] 模块还在装修中...<br>喵呜~</p>`;
    }
}

function buyGoods(g) {
    if(player.money >= g.p) {
        player.money -= g.p;
        player.inventory.push(g.n);
        addLog(`买入 ${g.n}，花费￥${g.p}`);
        updatePortUI();
    } else { catAlert("钱不够，去打工吧船长！"); }
}

function handleSupply() {
    if(player.money >= 50) {
        player.money -= 50; player.supply += 20;
        addLog("进行了补给，花费￥50。"); updatePortUI();
    } else { catAlert("没钱买鱼干了！"); }
}

function handleRepair() {
    if(player.money >= 100) {
        player.money -= 100; player.hull = 100;
        addLog("修理了船只，花费￥100。"); updatePortUI();
        catAlert("船只已修好，精神焕发喵！");
    }
}

function handleDepart() {
    if (player.supply <= 0) return catAlert("你的补给为0，请先进行补给。小猫饿了会吃掉船长的！");
    if (player.sailors <= 0) return catAlert("你没有足够的水手，请先招募。");

    if (player.hull < 50) {
        catConfirm("你的船体受损严重，是否仍然确认出港？", () => showDepartMenu());
    } else {
        showDepartMenu();
    }
}

function showDepartMenu() {
    const win = document.getElementById('sub-window');
    const content = document.getElementById('sub-window-content');
    const title = document.getElementById('sub-window-title');
    win.className = 'modal-hidden modal-show';
    title.innerText = "出航 - 请选择目的地";
    content.innerHTML = '';

    player.history.forEach((h, i) => {
        const btn = document.createElement('div');
        btn.className = 'pixel-btn';
        btn.innerText = `${i+1}. ${h}`;
        if(h !== "【空】") btn.onclick = () => sailTo(h);
        content.appendChild(btn);
    });

    const xjb = document.createElement('div');
    xjb.className = 'pixel-btn'; xjb.style.background = 'var(--btn-yellow)';
    xjb.innerText = "7. XJB探索";
    xjb.onclick = () => sailTo("未知海域");
    content.appendChild(xjb);
}

function sailTo(target) {
    closeModule();
    addLog(`正在向 [${target}] 航行...`);
    // 模拟航行扣除
    player.supply -= 5;
    player.hull -= Math.floor(Math.random()*5);
    setTimeout(() => {
        if(target !== "未知海域") player.currentPort = target;
        updatePortUI();
        catAlert(`抵达了 ${player.currentPort}！`);
        addLog(`抵达港口，消耗了补给。`);
    }, 1000);
}

function closeModule() { document.getElementById('sub-window').className = 'modal-hidden'; }
function addLog(msg) {
    const log = document.getElementById('log-area');
    log.innerHTML += `<div>> ${msg}</div>`;
    log.scrollTop = log.scrollHeight;
}
function saveGame() { localStorage.setItem('bigcat_save', JSON.stringify(player)); addLog("进度已保存。"); }
function loadGame() {
    const d = localStorage.getItem('bigcat_save');
    if(d) { player = JSON.parse(d); updatePortUI(); showScreen('port-screen'); addLog("读取进度成功。"); }
    else catAlert("没有找到存档喵。");
}