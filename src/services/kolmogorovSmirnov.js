const table = [];

table[0] = [0.995, 0.99, 0.975, 0.95, 0.9];
table[1] = [0.9293, 0.9, 0.8418, 0.7763, 0.6837];
table[2] = [0.829, 0.7845, 0.7076, 0.636, 0.5648];
table[3] = [0.7342, 0.6888, 0.6239, 0.5652, 0.4926];
table[4] = [0.6685, 0.6271, 0.5632, 0.5094, 0.4469];
table[5] = [0.6166, 0.5774, 0.5192, 0.4679, 0.4103];
table[6] = [0.5758, 0.5384, 0.4834, 0.436, 0.3814];
table[7] = [0.5418, 0.5065, 0.4542, 0.4096, 0.3582];
table[8] = [0.5133, 0.4796, 0.43, 0.3874, 0.339];
table[9] = [0.4889, 0.4566, 0.4092, 0.3686, 0.3225];
table[10] = [0.4677, 0.4367, 0.3912, 0.3524, 0.3082];
table[11] = [0.449, 0.4191, 0.3754, 0.3381, 0.2957];
table[12] = [0.4324, 0.4036, 0.3614, 0.3254, 0.2846];
table[13] = [0.4176, 0.3897, 0.3448, 0.3141, 0.2747];
table[14] = [0.4042, 0.3771, 0.3376, 0.3039, 0.2658];
table[15] = [0.392, 0.3657, 0.3283, 0.2947, 0.2577];
table[16] = [0.3808, 0.3552, 0.3179, 0.2862, 0.2503];
table[17] = [0.3706, 0.3456, 0.3093, 0.2785, 0.2435];
table[18] = [0.3611, 0.3368, 0.3014, 0.2713, 0.2435];
table[19] = [0.3524, 0.3286, 0.294, 0.2647, 0.2315];

const getKormorovSmirnov = (alpha, nums) => {
  switch (alpha) {
    case 0.01:
      return table[nums - 1][0];
    case 0.02:
      return table[nums - 1][1];
    case 0.05:
      return table[nums - 1][2];
    case 0.1:
      return table[nums - 1][3];
    case 0.2:
      return table[nums - 1][4];
    default:
      return 0;
  }
};

module.exports = { getKormorovSmirnov };