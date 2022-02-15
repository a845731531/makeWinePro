module.exports = {
    
    serialize(node) {
		let baseInfo = {
			name: node.name,
			x: node.x,
			y: node.y,
			width: parseInt(node.width),
			height: parseInt(node.height),
			color: {
				r: node.color.r,
				g: node.color.g,
				b: node.color.b,
                a: node.opacity,
			},
			scaleX: node.scaleX,
			scaleY: node.scaleY,
			rotation: -node.angle,
            anchorX: node.anchorX,
            anchorY: node.anchorY,
		}
		return baseInfo;
	},
	deserialize(node, baseInfo) {
		if(baseInfo)
		{
			node.name = baseInfo.name.replace("(Clone)", "")
			node.active = baseInfo.active
			node.x = baseInfo.x
			node.y = baseInfo.y
			node.angle = 0 - baseInfo.rotation
			node.scaleX = baseInfo.scaleX
			node.scaleY = baseInfo.scaleY
			node.anchorX = baseInfo.anchorX
			node.anchorY = baseInfo.anchorY
			node.width = baseInfo.width
			node.height = baseInfo.height
			node.color = cc.color(baseInfo.color.r, baseInfo.color.g,baseInfo.color.b)
			node.opacity = baseInfo.color.a
		}
	},
}