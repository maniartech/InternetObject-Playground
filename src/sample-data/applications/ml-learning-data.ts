const schema = `
# For multi-task learning, where a single model is trained to predict multiple outputs,
# nested tabular data can be very useful for organizing related tasks and their respective features.
# Here's an example in the Internet Object format, where the model needs to predict both user
# engagement (e.g., clicks, likes) and user churn based on user behavior and demographics:
~ $user: {
  userId: int,
  demographics: {age: int, gender: {string, choices:["male", "female", "other"]}, location: string},
  behavior: {dailyUsage: float, recentActivityCount: int},  # hours per day and number of activities
  tasks: {
    engagement: {clicks: int, likes: int},
    churnRisk: bool
  }
}
~ $schema: $user
`.trim()

const doc = `
~ 1, {60, male, New York}, {4.6, 3}, {{4, 7}, F}
~ 2, {23, other, Illinois}, {0.7, 30}, {{1, 9}, T}
~ 3, {18, female, Florida}, {2.1, 11}, {{5, 2}, T}
~ 4, {50, other, Florida}, {1.4, 2}, {{5, 5}, T}
~ 5, {45, other, Texas}, {3.8, 22}, {{4, 2}, F}
~ 6, {63, other, Illinois}, {4.9, 23}, {{8, 3}, F}
~ 7, {53, other, Florida}, {3.8, 19}, {{5, 5}, T}
~ 8, {56, other, Illinois}, {0.7, 6}, {{2, 0}, T}
~ 9, {47, male, New York}, {3.1, 9}, {{0, 6}, F}
~ 10, {44, female, New York}, {2.4, 17}, {{5, 8}, F}
~ 11, {44, other, New York}, {3.4, 17}, {{2, 4}, F}
~ 12, {20, female, New York}, {4.3, 12}, {{7, 10}, F}
~ 13, {40, other, Illinois}, {2.7, 11}, {{2, 2}, F}
~ 14, {49, other, California}, {2.3, 16}, {{6, 8}, F}
~ 15, {27, female, Texas}, {1.0, 26}, {{0, 4}, T}
~ 16, {64, male, Florida}, {4.9, 16}, {{3, 8}, T}
~ 17, {31, male, Texas}, {1.8, 29}, {{5, 3}, F}
~ 18, {20, other, Texas}, {2.2, 26}, {{9, 1}, F}
~ 19, {62, female, Illinois}, {2.6, 19}, {{9, 10}, T}
~ 20, {18, other, California}, {1.3, 20}, {{0, 1}, F}
~ 21, {53, male, Florida}, {4.2, 6}, {{0, 4}, F}
~ 22, {45, other, California}, {2.6, 12}, {{6, 3}, F}
~ 23, {50, other, Texas}, {2.7, 1}, {{3, 9}, T}
~ 24, {56, male, Florida}, {2.5, 5}, {{2, 6}, F}
~ 25, {32, female, Texas}, {1.5, 20}, {{9, 0}, T}
~ 26, {38, other, Florida}, {4.8, 23}, {{10, 8}, T}
~ 27, {27, female, Texas}, {1.8, 2}, {{3, 9}, F}
~ 28, {26, other, Texas}, {3.3, 8}, {{1, 5}, F}
~ 29, {37, female, Illinois}, {2.9, 13}, {{8, 2}, T}
~ 30, {21, female, Texas}, {2.6, 2}, {{1, 7}, T}
~ 31, {28, female, Illinois}, {3.2, 2}, {{5, 4}, T}
~ 32, {36, other, Florida}, {1.5, 17}, {{7, 0}, F}
~ 33, {39, female, Texas}, {2.3, 19}, {{0, 3}, T}
~ 34, {47, other, Texas}, {0.6, 7}, {{8, 1}, F}
~ 35, {62, other, Florida}, {4.1, 19}, {{1, 7}, T}
~ 36, {43, male, Florida}, {3.6, 18}, {{0, 8}, F}
~ 37, {34, male, Texas}, {2.4, 27}, {{4, 8}, T}
~ 38, {47, female, New York}, {2.9, 22}, {{0, 2}, F}
~ 39, {44, other, Texas}, {4.9, 3}, {{1, 0}, F}
~ 40, {25, other, Florida}, {2.3, 23}, {{6, 6}, F}
~ 41, {33, other, California}, {3.1, 20}, {{1, 0}, T}
~ 42, {23, female, Florida}, {3.0, 24}, {{4, 3}, T}
~ 43, {37, female, California}, {1.8, 12}, {{0, 6}, T}
~ 44, {49, male, California}, {4.3, 24}, {{6, 8}, T}
~ 45, {34, other, Florida}, {1.3, 8}, {{0, 0}, T}
~ 46, {50, female, California}, {3.8, 18}, {{10, 1}, T}
~ 47, {48, female, New York}, {3.1, 29}, {{1, 7}, T}
~ 48, {38, female, California}, {1.5, 30}, {{2, 3}, F}
~ 49, {51, male, New York}, {4.7, 20}, {{4, 5}, F}
~ 50, {29, other, Florida}, {3.9, 6}, {{10, 0}, F}
~ 51, {45, male, California}, {1.0, 28}, {{8, 4}, F}
~ 52, {44, male, Florida}, {2.9, 10}, {{10, 2}, T}
~ 53, {35, female, New York}, {1.9, 17}, {{5, 10}, T}
~ 54, {54, female, Florida}, {0.6, 29}, {{9, 7}, F}
~ 55, {40, female, Illinois}, {2.7, 29}, {{3, 9}, F}
~ 56, {28, female, California}, {1.8, 12}, {{1, 8}, T}
~ 57, {19, male, Florida}, {3.1, 3}, {{5, 9}, F}
~ 58, {51, other, New York}, {0.6, 5}, {{9, 3}, T}
~ 59, {61, female, Texas}, {3.6, 2}, {{4, 1}, T}
~ 60, {36, male, California}, {3.7, 21}, {{6, 10}, F}
~ 61, {30, female, New York}, {4.8, 25}, {{2, 4}, T}
~ 62, {35, other, Illinois}, {4.4, 14}, {{1, 8}, T}
~ 63, {35, male, Texas}, {4.9, 5}, {{0, 2}, T}
~ 64, {33, female, Illinois}, {1.5, 1}, {{7, 10}, F}
~ 65, {35, male, Illinois}, {2.2, 6}, {{8, 8}, T}
~ 66, {48, other, New York}, {2.9, 3}, {{0, 9}, F}
~ 67, {64, male, California}, {0.6, 25}, {{3, 4}, F}
~ 68, {29, male, Illinois}, {1.7, 13}, {{6, 8}, T}
~ 69, {40, male, California}, {1.4, 25}, {{0, 8}, F}
~ 70, {32, other, New York}, {3.3, 6}, {{6, 9}, T}
~ 71, {61, female, California}, {0.6, 24}, {{9, 1}, F}
~ 72, {37, female, Illinois}, {2.5, 21}, {{3, 7}, T}
~ 73, {35, other, Florida}, {0.5, 0}, {{4, 10}, F}
~ 74, {56, other, California}, {3.7, 3}, {{7, 8}, F}
~ 75, {36, male, New York}, {1.5, 6}, {{8, 2}, T}
~ 76, {35, other, California}, {1.9, 17}, {{5, 2}, T}
~ 77, {26, male, New York}, {1.4, 15}, {{5, 0}, T}
~ 78, {43, other, Texas}, {1.4, 23}, {{3, 2}, F}
~ 79, {20, other, New York}, {4.8, 4}, {{6, 2}, T}
~ 80, {58, other, Florida}, {3.2, 25}, {{9, 4}, F}
~ 81, {30, male, Florida}, {2.5, 27}, {{9, 4}, T}
~ 82, {32, other, Texas}, {4.2, 11}, {{3, 4}, T}
~ 83, {39, male, New York}, {3.4, 9}, {{7, 6}, T}
~ 84, {21, male, Illinois}, {3.4, 19}, {{6, 7}, F}
~ 85, {61, other, Illinois}, {4.2, 24}, {{3, 2}, T}
~ 86, {24, female, Florida}, {3.2, 25}, {{5, 3}, T}
~ 87, {56, male, California}, {2.7, 27}, {{7, 5}, F}
~ 88, {36, male, Texas}, {2.5, 15}, {{7, 7}, T}
~ 89, {59, other, Florida}, {1.1, 17}, {{2, 5}, T}
~ 90, {32, female, New York}, {1.4, 25}, {{1, 1}, T}
~ 91, {60, female, New York}, {3.8, 15}, {{6, 7}, T}
~ 92, {23, male, New York}, {3.0, 18}, {{7, 3}, F}
~ 93, {28, other, New York}, {3.0, 27}, {{0, 10}, T}
~ 94, {56, other, Florida}, {3.8, 25}, {{10, 2}, F}
~ 95, {22, male, Texas}, {4.1, 17}, {{7, 5}, T}
~ 96, {55, female, Illinois}, {4.1, 30}, {{1, 10}, F}
~ 97, {43, male, Texas}, {3.1, 19}, {{5, 9}, T}
~ 98, {24, male, New York}, {2.6, 14}, {{3, 7}, T}
~ 99, {50, female, Texas}, {2.7, 1}, {{1, 2}, F}
~ 100, {30, male, Florida}, {4.2, 14}, {{10, 8}, T}
~ 101, {60, other, Illinois}, {4.6, 30}, {{8, 4}, T}
~ 102, {28, other, New York}, {4.0, 21}, {{6, 0}, T}
~ 103, {22, other, Texas}, {3.3, 10}, {{6, 9}, F}
~ 104, {51, male, Illinois}, {2.8, 28}, {{10, 10}, F}
~ 105, {21, male, New York}, {1.6, 1}, {{9, 3}, F}
~ 106, {21, male, Texas}, {3.1, 1}, {{0, 2}, F}
~ 107, {27, female, New York}, {4.2, 30}, {{9, 2}, T}
~ 108, {61, male, Illinois}, {2.5, 17}, {{4, 10}, T}
~ 109, {18, female, Texas}, {1.9, 0}, {{7, 9}, F}
~ 110, {44, male, Texas}, {3.6, 21}, {{6, 10}, T}
~ 111, {48, female, Florida}, {2.5, 23}, {{8, 5}, F}
~ 112, {51, female, Illinois}, {3.1, 23}, {{9, 5}, T}
~ 113, {61, male, Texas}, {3.6, 4}, {{10, 8}, T}
~ 114, {50, female, Illinois}, {1.9, 29}, {{1, 1}, F}
~ 115, {38, female, Illinois}, {1.7, 2}, {{10, 10}, T}
~ 116, {19, male, Illinois}, {0.6, 24}, {{2, 0}, T}
~ 117, {19, male, Texas}, {1.0, 11}, {{0, 1}, T}
~ 118, {31, male, Illinois}, {2.1, 27}, {{5, 1}, T}
~ 119, {33, male, New York}, {1.2, 2}, {{0, 9}, T}
~ 120, {37, male, California}, {4.2, 1}, {{8, 6}, F}
~ 121, {37, female, Illinois}, {4.5, 24}, {{5, 8}, T}
~ 122, {52, other, California}, {1.7, 14}, {{10, 2}, F}
~ 123, {44, male, Texas}, {1.0, 24}, {{2, 9}, T}
~ 124, {65, female, Florida}, {4.2, 4}, {{8, 2}, F}
~ 125, {20, male, New York}, {2.2, 27}, {{4, 10}, T}
~ 126, {33, male, California}, {3.9, 29}, {{9, 10}, F}
~ 127, {38, other, California}, {4.9, 1}, {{9, 6}, F}
~ 128, {55, male, California}, {2.6, 29}, {{5, 3}, F}
~ 129, {49, female, Illinois}, {1.7, 6}, {{4, 7}, F}
~ 130, {59, male, Texas}, {3.1, 7}, {{7, 4}, F}
~ 131, {52, male, Illinois}, {3.2, 5}, {{3, 2}, F}
~ 132, {25, other, Texas}, {0.5, 23}, {{6, 6}, T}
~ 133, {36, female, Florida}, {2.4, 3}, {{9, 6}, F}
~ 134, {35, male, Florida}, {2.5, 18}, {{2, 0}, F}
~ 135, {18, other, California}, {0.9, 0}, {{9, 4}, T}
~ 136, {50, female, Florida}, {1.8, 11}, {{6, 2}, T}
~ 137, {47, male, Illinois}, {3.3, 5}, {{6, 6}, T}
~ 138, {24, male, California}, {2.8, 24}, {{8, 9}, T}
~ 139, {26, male, California}, {2.0, 17}, {{10, 2}, T}
~ 140, {38, male, New York}, {2.3, 9}, {{9, 10}, T}
~ 141, {36, other, Texas}, {1.2, 26}, {{0, 9}, F}
~ 142, {31, male, Florida}, {4.1, 17}, {{3, 10}, F}
~ 143, {49, male, Texas}, {2.0, 9}, {{0, 10}, T}
~ 144, {18, male, Florida}, {3.1, 10}, {{0, 1}, T}
~ 145, {49, female, Illinois}, {1.7, 18}, {{2, 4}, F}
~ 146, {20, other, Illinois}, {4.9, 19}, {{7, 3}, T}
~ 147, {51, female, Florida}, {2.5, 1}, {{2, 3}, F}
~ 148, {58, male, Florida}, {3.9, 29}, {{3, 3}, T}
~ 149, {51, other, Florida}, {1.4, 4}, {{10, 6}, F}
~ 150, {56, female, California}, {4.5, 4}, {{10, 1}, F}
~ 151, {22, other, Florida}, {3.5, 18}, {{0, 2}, F}
~ 152, {18, male, Illinois}, {2.9, 1}, {{10, 9}, T}
~ 153, {27, other, California}, {2.5, 10}, {{7, 6}, T}
~ 154, {19, other, California}, {4.4, 12}, {{2, 9}, F}
~ 155, {56, male, New York}, {0.7, 10}, {{5, 4}, F}
~ 156, {25, other, Illinois}, {4.4, 16}, {{9, 10}, T}
~ 157, {63, other, New York}, {4.9, 13}, {{2, 4}, F}
~ 158, {43, other, Florida}, {4.5, 14}, {{7, 3}, F}
~ 159, {18, other, New York}, {3.4, 4}, {{3, 3}, T}
~ 160, {63, other, Illinois}, {3.6, 5}, {{9, 7}, F}
~ 161, {26, female, Texas}, {3.5, 0}, {{0, 3}, F}
~ 162, {20, female, Texas}, {1.1, 13}, {{9, 7}, F}
~ 163, {26, female, Illinois}, {4.5, 14}, {{5, 1}, F}
~ 164, {49, other, New York}, {3.4, 30}, {{6, 8}, T}
~ 165, {55, other, California}, {1.2, 6}, {{0, 7}, T}
~ 166, {32, female, New York}, {2.5, 6}, {{5, 0}, T}
~ 167, {33, male, Florida}, {2.4, 19}, {{1, 2}, F}
~ 168, {20, female, California}, {1.6, 6}, {{3, 7}, F}
~ 169, {64, male, California}, {3.1, 15}, {{5, 6}, F}
~ 170, {39, other, Illinois}, {0.9, 7}, {{5, 10}, F}
~ 171, {36, female, Florida}, {1.9, 15}, {{5, 4}, F}
~ 172, {21, female, Florida}, {2.6, 29}, {{4, 1}, T}
~ 173, {62, other, California}, {4.8, 16}, {{0, 7}, F}
~ 174, {23, female, Texas}, {4.2, 19}, {{7, 10}, T}
~ 175, {42, female, California}, {0.9, 21}, {{9, 4}, F}
~ 176, {36, other, California}, {2.6, 4}, {{10, 5}, F}
~ 177, {47, male, Illinois}, {3.8, 30}, {{0, 10}, F}
~ 178, {51, male, New York}, {1.4, 1}, {{1, 7}, T}
~ 179, {50, male, Texas}, {4.2, 26}, {{2, 7}, T}
~ 180, {59, female, New York}, {2.0, 1}, {{10, 5}, T}
~ 181, {50, other, Texas}, {3.8, 20}, {{10, 9}, F}
~ 182, {54, other, New York}, {3.6, 10}, {{9, 10}, F}
~ 183, {43, male, Florida}, {1.3, 27}, {{2, 4}, T}
~ 184, {39, female, Florida}, {4.1, 15}, {{4, 10}, F}
~ 185, {29, female, Texas}, {3.8, 21}, {{8, 6}, F}
~ 186, {54, female, Illinois}, {1.7, 6}, {{6, 6}, T}
~ 187, {27, male, Texas}, {3.2, 20}, {{1, 4}, F}
~ 188, {39, female, Texas}, {1.2, 25}, {{0, 3}, T}
~ 189, {56, other, Florida}, {3.2, 19}, {{8, 5}, F}
~ 190, {64, female, Illinois}, {2.8, 12}, {{9, 2}, F}
~ 191, {23, other, Florida}, {4.7, 19}, {{9, 1}, T}
~ 192, {57, other, New York}, {3.9, 2}, {{10, 5}, T}
~ 193, {24, female, Florida}, {3.5, 2}, {{5, 1}, F}
~ 194, {41, female, Illinois}, {3.8, 9}, {{8, 1}, F}
~ 195, {23, other, Florida}, {1.3, 6}, {{10, 3}, F}
~ 196, {54, male, Illinois}, {2.1, 7}, {{7, 1}, F}
~ 197, {48, male, Florida}, {3.0, 21}, {{2, 3}, T}
~ 198, {40, other, New York}, {2.4, 18}, {{1, 0}, T}
~ 199, {41, male, California}, {3.4, 7}, {{2, 7}, T}
~ 200, {25, female, New York}, {3.9, 18}, {{1, 7}, T}
`.trim()

const exportable = {
  doc,
  schema,
  name: 'ML Learning Data',
  id: 'ml-learning-data',
  schemaPanelHeight: 310,
}

export default exportable;
