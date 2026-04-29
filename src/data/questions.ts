export interface Question {
  id: number;
  dimension: string;
  text: string;
  options: { value: number; label: string }[];
}

export const questions: Question[] = [
  // BURN 燃度
  {
    id: 1,
    dimension: 'BURN',
    text: '正手拉球下网了，你觉得是？',
    options: [
      { value: 1, label: 'A. 网的问题，它今天肯定长高了。' },
      { value: 2, label: 'B. 胶皮没粘性了（看了一眼去年买的胶皮）。' },
      { value: 3, label: 'C. 不拉一板我浑身难受，下网也拉。' },
    ],
  },
  {
    id: 2,
    dimension: 'BURN',
    text: '对手发球前摸了5下台子吹了3口气，你内心？',
    options: [
      { value: 1, label: 'A. 他在做法，我也摸一下抵消诅咒。' },
      { value: 2, label: 'B. 无所谓，他做他的法，我打我的球。' },
      { value: 3, label: 'C. 裁判呢？计时器呢？快判他拖延比赛！' },
    ],
  },
  {
    id: 3,
    dimension: 'BURN',
    text: '赢了一个很难缠的对手，你最可能？',
    options: [
      { value: 1, label: 'A. "运气运气，你今天状态不好"（内心：嘻嘻嘻）。' },
      { value: 2, label: 'B. 故作镇定收拾包，出了球馆大门开始狂奔庆祝。' },
      { value: 3, label: 'C. 不说话，只是深情地亲吻了一下胶皮。' },
    ],
  },
  {
    id: 4,
    dimension: 'BURN',
    text: '打球时你的脑子在想什么？',
    options: [
      { value: 1, label: 'A. 晚饭吃什么 / 那个谁怎么还没回我消息。' },
      { value: 2, label: 'B. 刚才那个球我动作帅不帅。' },
      { value: 3, label: 'C. 全是空气动力学和抛物线计算，没空想别的。' },
    ],
  },
  {
    id: 5,
    dimension: 'BURN',
    text: '路上看到一个空的乒乓球台，你的反应是？',
    options: [
      { value: 1, label: 'A. 心率加快，一个箭步冲上去把包扔在台上。' },
      { value: 2, label: 'B. 表面淡定走过，心里已经打了一局。' },
      { value: 3, label: 'C. 拍照发群里："兄弟们，速来！"' },
    ],
  },
  // TOUGH 韧度
  {
    id: 6,
    dimension: 'TOUGH',
    text: '球拍磕到桌角掉了一块木屑，你？',
    options: [
      { value: 1, label: 'A. 无所谓，战损版更有味道。' },
      { value: 2, label: 'B. 心痛三秒，然后用护边贴住当无事发生。' },
      { value: 3, label: 'C. 晴天霹雳，当场检查是否拉丝，然后心疼地摸拍子："宝，我的错。"' },
    ],
  },
  {
    id: 7,
    dimension: 'TOUGH',
    text: '看比赛看到赛点，你会？',
    options: [
      { value: 1, label: 'A. 关掉声音，防止解说奶死。' },
      { value: 2, label: 'B. 在群里疯狂发"救救我救救我"。' },
      { value: 3, label: 'C. 去上厕所，回来直接看回放——受不了那刺激。' },
    ],
  },
  {
    id: 8,
    dimension: 'TOUGH',
    text: '擦网球这种事，你怎么看？',
    options: [
      { value: 1, label: 'A. 我擦网：运气也是实力。对手擦网：会不会打球？' },
      { value: 2, label: 'B. 擦网后举手示意，但内心毫无歉意。' },
      { value: 3, label: 'C. 擦网得分后说"抱歉"，但嘴角比AK还难压。' },
    ],
  },
  {
    id: 9,
    dimension: 'TOUGH',
    text: '你觉得自己更像哪种乒乓球？',
    options: [
      { value: 1, label: 'A. 赛璐珞球：易燃易爆炸，一点就着。' },
      { value: 2, label: 'B. 塑料球：皮实耐造，旋转弱但稳定。' },
      { value: 3, label: 'C. 三星球：贵，但抗压不变形。' },
    ],
  },
  {
    id: 10,
    dimension: 'TOUGH',
    text: '你在球场上是什么动物？',
    options: [
      { value: 1, label: 'A. 猴：上蹿下跳，乱了就慌。' },
      { value: 2, label: 'B. 猫：优雅，输赢不影响姿态。' },
      { value: 3, label: 'C. 牛：闷头扛，越打越稳。' },
    ],
  },
  // PREC 精度
  {
    id: 11,
    dimension: 'PREC',
    text: '关于"烧器材"，你的态度是？',
    options: [
      { value: 1, label: 'A. 成品拍战神，听不懂你在说什么。' },
      { value: 2, label: 'B. 嘴上说不烧了，手已经打开了海鲜市场。' },
      { value: 3, label: 'C. 烧！新款必须拥有，虽然打起来和旧的一样。' },
    ],
  },
  {
    id: 12,
    dimension: 'PREC',
    text: '发球时你的抛球高度？',
    options: [
      { value: 1, label: 'A. 随缘，抛多高看心情。' },
      { value: 2, label: 'B. 极高，高到我自己都得抬头找球。' },
      { value: 3, label: 'C. 严格16cm，我用游标卡尺量过。' },
    ],
  },
  {
    id: 13,
    dimension: 'PREC',
    text: '打输了，你通常怎么复盘？',
    options: [
      { value: 1, label: 'A. 复盘？输了就输了，快乐就完了。' },
      { value: 2, label: 'B. 发朋友圈："今天是菜狗，明天再战。"' },
      { value: 3, label: 'C. 沉默不语，回家狂刷教学视频到凌晨三点。' },
    ],
  },
  {
    id: 14,
    dimension: 'PREC',
    text: '"乒乓球"和"人生"的关系，你更同意？',
    options: [
      { value: 1, label: 'A. 没什么关系，打球别想那么多。' },
      { value: 2, label: 'B. 都是旋转，看不透也猜不透。' },
      { value: 3, label: 'C. 都想一板过，但大多数时候都在搓来搓去。' },
    ],
  },
  {
    id: 15,
    dimension: 'PREC',
    text: '如果乒乓球成精了，它对你说的第一句话是？',
    options: [
      { value: 1, label: 'A. "别磕了，再磕我真碎了。"' },
      { value: 2, label: 'B. "你今天手感不行，别赖我。"' },
      { value: 3, label: 'C. "你搓够了吗？能不能拉一板让我飞一会儿？"' },
    ],
  },
  // SHOW 可见度
  {
    id: 16,
    dimension: 'SHOW',
    text: '双打时队友失误了，你？',
    options: [
      { value: 1, label: 'A. 拍拍他："没事没事，我的我的。"' },
      { value: 2, label: 'B. 主动去捡球，给他冷静的时间。' },
      { value: 3, label: 'C. 表面微笑，内心：这球换我奶奶都能接过去。' },
    ],
  },
  {
    id: 17,
    dimension: 'SHOW',
    text: '"以德服人"在球场上的理解是？',
    options: [
      { value: 1, label: 'A. 用我的铁搓搓到对手服气。' },
      { value: 2, label: 'B. 用我的爆冲打到对手满台捡球。' },
      { value: 3, label: 'C. 用我的擦网擦边让对手无话可说。' },
    ],
  },
  // BOND 黏度
  {
    id: 18,
    dimension: 'BOND',
    text: '球馆里最神秘的人是谁？',
    options: [
      { value: 1, label: 'A. 穿拖鞋、用成品拍、打长胶的大爷。' },
      { value: 2, label: 'B. 永远坐在角落看别人打、自己从不上的大哥。' },
      { value: 3, label: 'C. 前台收银阿姨——她其实什么都会。' },
    ],
  },
  // 通用/混合维度
  {
    id: 19,
    dimension: 'BURN',
    text: '此题无正确选项，请盲选：',
    options: [
      { value: 1, label: 'A. 我是阴暗的乒乓球，爬行的弧圈。' },
      { value: 2, label: 'B. 发球，但抛歪了。' },
      { value: 3, label: 'C. 此时一位球桌仙人路过，并摸了摸台面。' },
    ],
  },
  {
    id: 20,
    dimension: 'BURN',
    text: '乒乓球最让你着迷的点是？',
    options: [
      { value: 1, label: 'A. 暴冲一板打穿对手时那声脆响。' },
      { value: 2, label: 'B. 听对手吃发球时那一声清脆的"啧"。' },
      { value: 3, label: 'C. 赢球后淡定喝水的装逼时刻。' },
    ],
  },
  // SHOW 可见度（补充3道）
  {
    id: 21,
    dimension: 'SHOW',
    text: '打球时如果发现有人在拍你，你的反应是？',
    options: [
      { value: 1, label: 'A. 浑身不自在，动作开始变形。' },
      { value: 2, label: 'B. 假装不知道，但默默把动作做标准了点。' },
      { value: 3, label: 'C. 来劲了，这是今天最高光的时刻。' },
    ],
  },
  {
    id: 22,
    dimension: 'SHOW',
    text: '你更喜欢在什么样的环境打球？',
    options: [
      { value: 1, label: 'A. 角落那张台，人少安静。' },
      { value: 2, label: 'B. 中间的台，无所谓位置。' },
      { value: 3, label: 'C. 最显眼那张台，路过的人都能看到。' },
    ],
  },
  {
    id: 23,
    dimension: 'SHOW',
    text: '打完一场好球，没人看到，你觉得？',
    options: [
      { value: 1, label: 'A. 挺好的，自己知道就行了。' },
      { value: 2, label: 'B. 有点可惜，但无所谓。' },
      { value: 3, label: 'C. 锦衣夜行，等于没打。' },
    ],
  },
  // BOND 黏度（补充3道）
  {
    id: 24,
    dimension: 'BOND',
    text: '你去球馆更常和谁一起？',
    options: [
      { value: 1, label: 'A. 自己去，固定时间固定项目。' },
      { value: 2, label: 'B. 和固定的一两个球友约。' },
      { value: 3, label: 'C. 群里吼一声，谁来算谁。' },
    ],
  },
  {
    id: 25,
    dimension: 'BOND',
    text: '换个新球馆打球，你会主动认识那里的常驻球友吗？',
    options: [
      { value: 1, label: 'A. 不会，打完就走。' },
      { value: 2, label: 'B. 如果对方主动搭话会聊两句。' },
      { value: 3, label: 'C. 会，第一周就能叫出前台阿姨的名字。' },
    ],
  },
  {
    id: 26,
    dimension: 'BOND',
    text: '球友约你打完球一起去吃宵夜，但你明天要早起，你？',
    options: [
      { value: 1, label: 'A. 直接拒绝，回家。' },
      { value: 2, label: 'B. 去吃但不喝酒，坐一会儿就走。' },
      { value: 3, label: 'C. 去，早起的事明天再说。' },
    ],
  },
  // TOUGH 韧度（补充2道）
  {
    id: 27,
    dimension: 'TOUGH',
    text: '0:2落后，第三局3:8落后，你脑子里在想什么？',
    options: [
      { value: 1, label: 'A. 已经在想等会儿吃什么了。' },
      { value: 2, label: 'B. 咬住，万一呢。' },
      { value: 3, label: 'C. 剧本来了，现在才是我的时间。' },
    ],
  },
  {
    id: 28,
    dimension: 'TOUGH',
    text: '连输五个人，你是最后一个走的，球馆就剩你一个人，你？',
    options: [
      { value: 1, label: 'A. 收拾走人，今天手感不行。' },
      { value: 2, label: 'B. 再练一会儿发球，反正也没人了。' },
      { value: 3, label: 'C. 掏出手机打开教学视频，不弄明白不回去。' },
    ],
  },
  // PREC 精度（补充2道）
  {
    id: 29,
    dimension: 'PREC',
    text: '你的球拍胶皮多久清洁一次？',
    options: [
      { value: 1, label: 'A. 什么？还要清洁？' },
      { value: 2, label: 'B. 想起来就擦一下。' },
      { value: 3, label: 'C. 每次打完都擦，用专门的清洁剂，晾干才放进拍套。' },
    ],
  },
  {
    id: 30,
    dimension: 'PREC',
    text: '你觉得自己的动作和标准动作差距大吗？',
    options: [
      { value: 1, label: 'A. 不知道，没对比过。' },
      { value: 2, label: 'B. 大概知道哪些地方不对。' },
      { value: 3, label: 'C. 我录过自己打球，逐帧对标过。' },
    ],
  },
];