//
//  ship.swift
//  language_learn
//
//  Created by Forrest on 10/7/17.
//  Copyright © 2017 Forrest. All rights reserved.
//

import ARKit

class ship: SCNNode {
    func loadModal(){
        guard let virtualObjectScene = SCNScene(named:"art.scnassets/ship.scn") else {return}
        
        let wrapperNode = SCNNode()
        
        for child in virtualObjectScene.rootNode.childNodes{
            wrapperNode.addChildNode(child)
        }
        self.addChildNode(wrapperNode)
    }
    
}

