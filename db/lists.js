var numberToLearnKanji = 4;
var maxToRepeatKanji = 3407;
var nextRepeatedKanji = 4677;
var learnListKanji = [1566, 1567, 1568, 1569, ];
var repeatListKanji = [4, 6, 7, 8, 9, 10, 14, 27, 29, 38, 41, 50, 56, 70, 75, 76, 78, 130, 133, 134, 135, 138, 153, 154, 161, 168, 170, 183, 189, 198, 205, 209, 219, 220, 223, 231, 232, 236, 251, 259, 282, 307, 315, 339, 354, 367, 379, 384, 386, 394, 414, 424, 426, 437, 472, 478, 479, 482, 492, 498, 499, 510, 515, 516, 519, 530, 531, 541, 556, 560, 562, 563, 576, 582, 583, 598, 600, 617, 618, 621, 624, 627, 634, 635, 636, 638, 641, 647, 652, 653, 654, 661, 663, 664, 665, 667, 668, 677, 685, 694, 695, 699, 700, 701, 710, 718, 733, 738, 746, 753, 754, 769, 780, 781, 787, 791, 796, 807, 810, 816, 862, 863, 865, 866, 867, 868, 871, 874, 881, 905, 920, 922, 927, 930, 932, 938, 943, 944, 945, 947, 948, 949, 951, 952, 968, 970, 971, 972, 985, 986, 1003, 1005, 1009, 1010, 1031, 1033, 1057, 1062, 1063, 1073, 1074, 1090, 1091, 1092, 1093, 1105, 1106, 1107, 1116, 1124, 1133, 1134, 1136, 1139, 1141, 1143, 1144, 1153, 1154, 1155, 1177, 1179, 1185, 1186, 1187, 1189, 1193, 1197, 1198, 1199, 1203, 1204, 1205, 1209, 1218, 1231, 1232, 1238, 1239, 1247, 1248, 1250, 1252, 1264, 1267, 1274, 1276, 1304, 1305, 1312, 1313, 1315, 1319, 1320, 1329, 1340, 1347, 1348, 1358, 1360, 1365, 1387, 1392, 1408, 1412, 1414, 1424, 1425, 1429, 1432, 1435, 1437, 1441, 1447, 1453, 1454, 1455, 1456, 1458, 1463, 1468, 1472, 1475, 1479, 1481, 1482, 1485, 1486, 1497, 1505, 1506, 1508, 1511, 1512, 1514, 1515, 1517, 1518, 1519, 1520, 1522, 1523, 1524, 1525, 1526, 1527, 1529, 1530, 1531, 1532, 1533, 1534, 1535, 1536, 1537, 1538, 1539, 1540, 1541, 1542, 1543, 1544, 1545, 1546, 1549, 1550, 1552, 1553, 1554, 1555, 1556, 1557, 1558, 1559, 1560, 1561, 1562, 1563, 1564, 1565, ];
var numberToRecognize = 1;
var numberToLearn = 8;
var numberToConfirm = 13;
var numberWithProblem = 2;
var numberToRepeat = 24;
var maxToRepeatWord = 3400;
var nextRepeatedWord = 7723;
var learnList = [4583, 4614, 4661, 4721, 4723, 4724, 4728, 4729, 4730, 4731, ];
var confirmList = [71, 551, 954, 1465, 1818, 2141, 2337, 2459, 2538, 2638, 2793, 2901, 2915, 2972, 3077, 3144, 3202, 3682, 3734, 3762, 4140, 4181, 4200, 4215, 4354, 4359, 4395, 4401, 4414, 4433, 4446, 4457, 4467, 4482, 4493, 4513, 4532, 4550, 4554, 4571, 4578, 4584, 4587, 4595, 4605, 4610, 4616, 4623, 4624, 4625, 4626, 4627, 4628, 4643, 4649, 4650, 4651, 4652, 4653, 4654, 4657, 4658, 4659, 4660, 4663, 4666, 4667, 4670, 4671, 4673, 4674, 4675, 4678, 4680, 4682, 4689, 4691, 4692, 4694, 4695, 4697, 4698, 4702, 4703, 4704, 4705, 4706, 4707, 4708, 4709, 4710, 4711, 4713, 4714, 4715, 4716, 4718, 4719, 4722, 4725, 4726, 4727, ];
var problemList = [18, 1461, 2359, 3027, 4511, 4594, ];
var repeatList = [7, 49, 73, 87, 118, 125, 129, 175, 184, 187, 220, 225, 234, 282, 300, 313, 348, 374, 385, 397, 399, 416, 430, 436, 448, 454, 466, 474, 502, 505, 513, 532, 535, 567, 589, 606, 627, 635, 644, 674, 695, 711, 712, 765, 778, 786, 796, 805, 813, 865, 880, 910, 921, 926, 931, 936, 1017, 1049, 1084, 1115, 1135, 1165, 1170, 1171, 1181, 1200, 1206, 1215, 1217, 1276, 1308, 1316, 1319, 1325, 1352, 1364, 1424, 1450, 1491, 1503, 1508, 1528, 1532, 1533, 1597, 1609, 1677, 1692, 1725, 1726, 1727, 1755, 1762, 1776, 1799, 1958, 2044, 2065, 2087, 2097, 2132, 2142, 2155, 2201, 2222, 2232, 2265, 2293, 2294, 2298, 2316, 2317, 2321, 2339, 2340, 2341, 2350, 2368, 2381, 2396, 2398, 2408, 2409, 2429, 2476, 2479, 2496, 2502, 2644, 2722, 2758, 2762, 2799, 2842, 2946, 2962, 2993, 3050, 3067, 3072, 3091, 3107, 3126, 3136, 3139, 3142, 3170, 3194, 3195, 3247, 3270, 3272, 3276, 3284, 3288, 3291, 3292, 3293, 3297, 3319, 3348, 3362, 3388, 3412, 3416, 3465, 3487, 3496, 3518, 3527, 3531, 3535, 3646, 3978, 3981, 3997, 4038, 4100, 4136, 4155, 4246, 4248, 4256, 4269, 4273, 4292, 4296, 4300, 4308, 4372, 4384, 4387, 4404, 4419, 4424, 4438, 4456, 4465, 4466, 4468, 4472, 4478, 4481, 4489, 4491, 4503, 4504, 4506, 4509, 4522, 4526, 4529, 4531, 4535, 4543, 4544, 4546, 4547, 4552, 4556, 4557, 4558, 4559, 4561, 4563, 4564, 4565, 4567, 4569, 4570, 4573, 4574, 4576, 4580, 4588, 4591, 4593, 4597, 4599, 4600, 4602, 4603, 4604, 4606, 4607, 4608, 4611, 4612, 4613, 4615, 4617, 4618, 4619, 4621, 4622, 4629, 4630, 4631, 4633, 4634, 4635, 4636, 4637, 4638, 4639, 4640, 4641, 4644, 4645, 4655, 4662, 4664, 4665, 4668, 4669, 4672, 4676, 4681, 4683, 4684, 4686, 4687, 4688, 4690, 4693, 4696, 4699, 4700, 4701, 4712, 4717, 4720, ];
var recognizeList = [1807, 2744, 4519, 4566, ];
var sessionList = ["KANJI_LEARN", "KANJI_LEARN", "KANJI_LEARN", "KANJI_LEARN", "KANJI_REPEAT", "KANJI_REPEAT", "KANJI_REPEAT", "KANJI_REPEAT", "KANJI_REPEAT", "KANJI_REPEAT", "KANJI_REPEAT", "KANJI_REPEAT", "RECOGNIZE", "LEARN", "LEARN", "LEARN", "LEARN", "LEARN", "LEARN", "LEARN", "LEARN", "CONFIRM", "CONFIRM", "CONFIRM", "CONFIRM", "CONFIRM", "CONFIRM", "CONFIRM", "CONFIRM", "CONFIRM", "CONFIRM", "CONFIRM", "CONFIRM", "CONFIRM", "PROBLEM", "PROBLEM", "REPEAT", "REPEAT", "REPEAT", "REPEAT", "REPEAT", "REPEAT", "REPEAT", "REPEAT", "REPEAT", "REPEAT", "REPEAT", "REPEAT", "REPEAT", "REPEAT", "REPEAT", "REPEAT", "REPEAT", "REPEAT", "REPEAT", "REPEAT", "REPEAT", "REPEAT", "REPEAT", "REPEAT", ];
