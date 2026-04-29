/**
 * PBTI 维度体系 - 重构版
 * 五大特质 × 六级梯度
 */

export interface DimensionDef {
  code: string;
  name: string;
  levels: {
    L1: string;
    L2: string;
    L3: string;
    L4: string;
    L5: string;
    L6: string;
  };
}

export const dimensionDefs: DimensionDef[] = [
  {
    code: 'BURN',
    name: '燃度',
    levels: {
      L1: '省电模式，能不动就不动',
      L2: '文火慢炖，持久输出',
      L3: '偶有高潮，但能收回',
      L4: '稳定输出，偶有爆点',
      L5: '高能预警，频繁燃爆',
      L6: '全功率永动机，停不下来',
    },
  },
  {
    code: 'TOUGH',
    name: '韧度',
    levels: {
      L1: '风吹即散，一压就垮',
      L2: '小逆还行，大逆摆烂',
      L3: '能撑一会儿，但会崩',
      L4: '有韧性，但会消耗自己',
      L5: '越压越强，绝境逆袭',
      L6: '逆境剧本狂，落后才来劲',
    },
  },
  {
    code: 'PREC',
    name: '精度',
    levels: {
      L1: '大而化之，差不多就行',
      L2: '过得去就行，别太讲究',
      L3: '重要的事会认真',
      L4: '有追求，但能妥协',
      L5: '细节控，不达标准不舒服',
      L6: '显微镜成精，差一点也不行',
    },
  },
  {
    code: 'SHOW',
    name: '可见度',
    levels: {
      L1: '只想隐身，不想被看到',
      L2: '低调行事，被关注会慌',
      L3: '小圈子可以，大舞台社恐',
      L4: '有时想表现，有时想躲',
      L5: '喜欢被关注，表现欲强',
      L6: '观众是我的氧气，舞台是我的家',
    },
  },
  {
    code: 'BOND',
    name: '黏度',
    levels: {
      L1: '孤狼结界，一米距离',
      L2: '君子之交，淡如水',
      L3: '需要独处充电，但能社交',
      L4: '有来有往，但不主动',
      L5: '享受连接，主动社交',
      L6: '人群充电站，社牛本牛',
    },
  },
];
