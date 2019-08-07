# DEMO说明
场景中有两个角色Player和Enemy。

玩家控制Player对象，上下左右移动。

Player进入Enemy的预警范围(guideDis)后，Enemy会对Player进行追逐。Player走出Enemy的撤退范围(retreatDis)后，Enemy会返回到出生点。

Player死亡时，若Enemy处于Chase状态，则返回Retreat状态。