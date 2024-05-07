// - for floor

// | for side wall
// _ for down wall
// = for up wall

// ~ for up decor
// , for down decor

// K for player/knight

// D for doubel door
// S for small door

// X for key

// P for pressure plate

// B for box
// O for barrel

export const map = [
	// Design the level layout with symbols
    // Background layer
    // level 1
    [
        "      D                                  POSB",
        "=~==~=  ==~~====|",
        "|               |",
        "|               |",
        "|               |",
        "|        X      |",
        "|               |",
        "|K              |",
        "|               |",
        "___,,__,__,_____|",
    ],
    // Level 2
    [
        "  D                                       B",
        "=~  ~===========|",
        "|               |",
        "|      O        |",
        "|K             P|",
        "|            ===|",
        "|            |X |",
        "|            |S |",
        "|            , ,|",
        "|               |",
        "|               |",
        "____,__,__,__,__|",
    ],
    // Level 3
    [
        "  D                                       ",
        "=~  ~=====~~====                          ",        
        "|           B  ===|",
        "|           B  X  |",
        "|           B B   |",
        "|           B B __|",
        "|           B B |",
        "|           B B |",
        "|           B B |",
        "|           B B |",
        "|        S  B B |",
        "|      =~ ~=B B |",
        "|      |   P   O|",
        "|      |      B |",
        "|      |      BK|",
        "_,,__,_____,,___|",

    ]
    ,
    // Level 4
    [
        "    D                                      B",
        "===~  ~=====|",
        "|           |",
        "|      X    |",
        "|           |",
        "|    S      |",
        "~===~ ~====~|",
        "|           |",
        "|           |",
        "|    S      |",
        "~===~ ~====~|",
        "|         K |",
        "|     O     |",
        "| P         |",
        "|  P        |",
        "_,__,__,__,_|",
    ]
    ,
    // Level 5
    [
        "  D                                      B",
        "=~  ~=======|",
        "|          P|",
        "|        ===|",
        "|        |X |",
        "|        |S |",
        "|        , ,|",
        "|   S       |",
        "~==~ ~=====~|",
        "|         K |",
        "|       O   |",
        "|           |",
        "|   P    P  |",
        "|           |",
        "|   S       |",
        "~==~ ~=====~|",
        "|           |",
        "|      O    |",
        "|           |",
        "_,__,__,__,_|",
    ]


]


export const baseLayer = [
	// Design the level layout with symbols
    // Background layer
    [
        "                ",
        "----------------",
        "----------------",
        "----------------",
        "----------------",
        "----------------",
        "----------------",
        "----------------",
        "----------------",
        "----------------",
    ],
    [
        "                ",
        "----------------",
        "----------------",
        "----------------",
        "----------------",
        "----------------",
        "----------------",
        "----------------",
        "----------------",
        "----------------",
        "----------------",

    ],
    [
        "                ",
        "----------------",
        "----------------",
        "------------------",
        "------------------",
        "----------------",
        "----------------",
        "----------------",
        "----------------",
        "----------------",
        "----------------",
        "----------------",
        "----------------",
        "----------------",
        "----------------",
    ],
    [
        "            ",
        "------------",
        "------------",
        "------------",
        "------------",
        "------------",
        "------------",
        "------------",
        "------------",
        "------------",
        "------------",
        "------------",
        "------------",
        "------------",
        "------------",
    ]
    ,
    [
        "            ",
        "------------",
        "------------",
        "------------",
        "------------",
        "------------",
        "------------",
        "------------",
        "------------",
        "------------",
        "------------",
        "------------",
        "------------",
        "------------",
        "------------",
        "------------",
        "------------",
        "------------",
        "------------",
    ]   
        
                
]
   