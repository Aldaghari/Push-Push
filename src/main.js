import kaboom from "kaboom"
import {baseLayer, map} from "./levels"


const k = kaboom({
	width: 1280,
	height: 720,
	letterbox: true,
	crisp: true,
	logTime: 8,
});

//k.setBackground(k.Color.fromHex("454545"))
k.setBackground(k.Color.BLACK)

loadSprite("UpWall", "sprites/Mini_Dungeon_v1.0/Tilesets/UpWall.png")
loadSprite("DownWall", "sprites/Mini_Dungeon_v1.0/Tilesets/DownWall.png")
loadSprite("UpDecor", "sprites/Mini_Dungeon_v1.0/Tilesets/UpDecor.png")
loadSprite("DownDecor", "sprites/Mini_Dungeon_v1.0/Tilesets/DownDecor.png")
loadSprite("SideWall", "sprites/Mini_Dungeon_v1.0/Tilesets/SideWall.png")
loadSprite("Floor", "sprites/Mini_Dungeon_v1.0/Tilesets/FloorM1.png")



loadSprite("knight", "sprites/Mini_Dungeon_v1.0/Characters/PlayerV3M.png", {
	sliceX: 6,
	anims: {
		"idle": {
			// Starts from frame 0, ends at frame 1
			from: 0,
			to: 0,
			// Frame per second
			speed: 3,
			loop: false,
		},
		"run": {
			from: 2,
			to: 5,
			speed: 4,
			loop: true,
		}
	},
})

loadSprite("BigDoor", "sprites/Mini_Dungeon_v1.0/Tilesets/DoubleDoor.png", {
	sliceX: 2,
	anims: {
		"closed": {
			from: 0,
			to: 0,
			speed: 3,
			loop: false,
		},
		"opened": {
			from: 1,
			to: 1,
			speed: 3,
			loop: false,
		}
	},
})

loadSprite("Key", "sprites/Mini_Dungeon_v1.0/Objects/Key.png", {
	sliceX: 8,
	anims: {
		"idle": {
			from: 0,
			to: 7,
			speed: 8,
			loop: true,
		}
	},
})

loadSprite("Plate", "sprites/Mini_Dungeon_v1.0/Objects/Pressureplate.png", {
	sliceX: 2,
	anims: {
		"up": {
			from: 0,
			to: 0,
			speed: 1,
			loop: false,
		},
		"down": {
			from: 1,
			to: 1,
			speed: 1,
			loop: false,
		}
	},
})

loadSprite("SmallDoor", "sprites/Mini_Dungeon_v1.0/Tilesets/Door_2.png", {
	sliceX: 2,
	anims: {
		"closed": {
			from: 0,
			to: 0,
			speed: 1,
			loop: false,
		},
		"opened": {
			from: 1,
			to: 1,
			speed: 1,
			loop: false,
		}
	},
})

loadSprite("Barrel", "sprites/Mini_Dungeon_v1.0/Tilesets/Barrel.png")

loadSprite("Box", "sprites/Mini_Dungeon_v1.0/Tilesets/Box.png")

loadSprite("R", "sprites/r.png")

// Touch Pad
loadSprite("right", "sprites/right.png")
loadSprite("left", "sprites/left.png")
loadSprite("up", "sprites/up.png")
loadSprite("down", "sprites/down.png")



scene("game", ({levelIdx}) => {
	k.camScale(3)
	addLevel(baseLayer[levelIdx], {
		tileWidth: 16,
		tileHeight: 16,
		tiles:
		{
			"-": () => [
				sprite("Floor"),
			],
		}
	})

const level = addLevel(map[levelIdx], 
	{
	// The size of each grid
	tileWidth: 16,
	tileHeight: 16,
	// The position of the top left block
	pos: vec2(0, 0),
	// Define what each symbol means (in components)
	tiles: {
		"K": () => [
			sprite("knight"),
			area({ shape: new Rect(vec2(3, 4), 8, 10) }),
			body(),
			z(40),
			"knight",
		],
		"=": () => [
			sprite("UpWall"),
			area(),
			body({ isStatic: true }),
		],
		"_": () => [
			sprite("DownWall"),
			area(),
			body({ isStatic: true }),
		],
		"|": () => [
			sprite("SideWall"),
			area(),
			body({ isStatic: true }),
		],
		"-": () => [
			sprite("Floor"),
		],
		"~": () => [
			sprite("UpDecor"),
			area(),
			body({ isStatic: true }),
		],
		",": () => [
			sprite("DownDecor"),
			area(),
			body({ isStatic: true }),
			anchor(new k.Vec2(-1, -0.9))
		],
		"D": () => [
			sprite("BigDoor"),
			area(),
			body({ isStatic: true }),
			anchor(new k.Vec2(-1, -1.2)),
			"bigDoor"
		],
		"X": () => [
			sprite("Key"),
			area(),
			"key",
		],
		"P": () => [
			sprite("Plate"),
			area(),
			z(10),
			"plate",
		],
		"S": () => [
			sprite("SmallDoor"),
			area({ shape: new Rect(vec2(0, 16), 16, 18) }),
			anchor(new k.Vec2(-1, -1.3)),
			body({ isStatic: true }),
			"smallDoor",
		],
		"O": () => [
			sprite("Barrel"),
			area({ shape: new Rect(vec2(0, 8), 12, 14) }),
			body({ isStatic: false, mass: 0.5 }),
			z(50),
			"barrel",
		],
		"B": () => [
			sprite("Box"),
			area(),
			body( {isStatic: true} ),
			"box",
		],
	},
})
	// Controls guide
	if (levelIdx == 0)
		k.debug.log("Use the Arrows to move, press R to restart level")

	const player = level.get("knight")[0]
	const key = level.get("key")[0]
	const plate = level.get("plate")
	const smallDoors = level.get("smallDoor")
	const bigDoor = level.get("bigDoor")[0]
	
	const rButton = add([
		sprite("R"),
		pos(0, 0),
		scale(0.7),
		fixed(),
		area()
	])

	// touch pad

	const leftPad = add([
		sprite("left"),
		pos(20, height() - 200),
		opacity(0),
		fixed(),
		area(),
		scale(0)
	])

	const rightPad = add([
		sprite("right"),
		pos(170, height() - 200),
		opacity(0),
		fixed(),
		area(),
		scale(0)
	])

	const upPad = add([
		sprite("up"),
		pos(95, height() - 280),
		opacity(0),
		fixed(),
		area(),
		scale(0)
	])

	const downPad = add([
		sprite("down"),
		pos(95, height() - 120),
		opacity(0),
		fixed(),
		area(),
		scale(0)
	])

	


	player.play("idle")
	key.play("idle")

	for (let index = 0; index < plate.length; index++) {
		plate[index].play("up")
		
	}
	

	// Player varibales
	var SPEED = 80.0
	var speed_vec = new k.Vec2(0.0, 0.0)

	// Status
	var hasKey = false 

	k.onUpdate(() => {
		camPos(player.worldPos())
		player.move(SPEED * speed_vec.unit().x, SPEED * speed_vec.unit().y)
		// .play() will reset to the first frame of the anim, so we want to make sure it only runs when the current animation is not "run"
		if (speed_vec.len() > 0 && player.curAnim() !== "run")
			player.play("run")
		
		if (hasKey)
			key.pos = vec2(player.pos.x, player.pos.y - 10)
		

	})

	// pad logic
	onTouchStart(() => {
		leftPad.opacity = 1
		leftPad.scale = vec2(1, 1)

		rightPad.opacity = 1
		rightPad.scale = vec2(1, 1)

		upPad.opacity = 1
		upPad.scale = vec2(1, 1)

		downPad.opacity = 1	
		downPad.scale = vec2(1, 1)
	})

	onTouchEnd(() => {
		player.play("idle")
		speed_vec.x = 0.0
		speed_vec.y = 0.0
	})

	leftPad.onClick(() => {
		speed_vec.x = -1.0
		player.flipX = true
	})

	rightPad.onClick(() => {
		speed_vec.x = 1.0
		player.flipX = false
	})

	upPad.onClick(() => {
		speed_vec.y = -1.0
	})

	downPad.onClick(() => {
		speed_vec.y = 1.0
	})

	onKeyDown("left", () => {
		speed_vec.x = -1.0
		player.flipX = true
	})

	onKeyDown("right", () => {
		speed_vec.x = 1.0
		player.flipX = false
	})

	onKeyDown("up", () => {
		speed_vec.y = -1.0
	})

	onKeyDown("down", () => {
		speed_vec.y = 1.0
	})

	;["left", "right", "down", "up"].forEach((key) => {
		onKeyRelease(key, () => {
		// Only reset to "idle" if player is not holding any of these keys
			player.play("idle")
			speed_vec.x = 0.0
			speed_vec.y = 0.0
		})
	})

	// Restart
	onKeyPress("r", () => {
		start(levelIdx)
	})

	// pick up key
	player.onCollide("key", (key) => {
		hasKey = true
	})

	// open door if has key
	player.onCollide("bigDoor", () => {
		if(hasKey)
		{
			console.log("win")
			destroy(level.get("key")[0])
			hasKey = false
			if (levelIdx < 4)
			{
				levelIdx++
				start(levelIdx)
			}
			else
			{
				k.debug.log("You finished the game!")
			}
		}
	})

	// Barrel, Knight, Plate actions
	for (let index = 0; index < plate.length; index++) {
		plate[index].onCollideUpdate("barrel", () => {
			plateAction("down", index)
		})
	
		plate[index].onCollideUpdate("knight", () => {
			plateAction("down", index)
		})
	
		plate[index].onCollideEnd("barrel", () => {
			plateAction("up", index)
		})
	
		plate[index].onCollideEnd("knight", () => {
			plateAction("up", index)
		})
	}
	

	function plateAction(s, i)
	{
		plate[i].play(s)
		var doorAnim = ""
		if (s == "down")
		{
			doorAnim = "opened"
			
			smallDoors[i].play(doorAnim)
			smallDoors[i].area.scale = vec2(0, 0)
			
		}
		else
		{
			doorAnim = "closed"
			
			smallDoors[i].play(doorAnim)
			smallDoors[i].area.scale = vec2(1, 1)
			
		}
	}

	

	// R button
	rButton.onClick(()=>{
		start(levelIdx)
	})
})

function start(i = 0) {
	// Start with the "game" scene, with initial parameters
	go("game", {
		levelIdx: i,
	})
}

start()