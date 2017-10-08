//
//  ViewController.swift
//  new_language
//
//  Created by Forrest on 10/7/17.
//  Copyright © 2017 Forrest. All rights reserved.
//

import UIKit
import ARKit
import SceneKit


class ViewController: UIViewController, ARSCNViewDelegate {
    
    
    @IBOutlet weak var sceneView: ARSCNView!
    
    
    override func viewDidLoad() {
       
        super.viewDidLoad()
        sceneView.delegate = self
        
        sceneView.showsStatistics = true
        
        // Create a new scene
        let scene = SCNScene(named: "art.scnassets/ship.scn")
        
        
        // Set the scene to the view
        sceneView.scene = scene
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        // Create a session configuration
        let configuration = ARWorldTrackingConfiguration()
        
        // Run the view's session
        sceneView.session.run(configuration)
        
        addObject()
    }
    
    func addObject() {
        let ship = ship_work()
        ship.loadModal()
        
//        let xPos = randomPosition(lowerBound: -1.5, upperBound: 1.5)
//        let yPos = randomPosition(lowerBound: -1.5, upperBound: 1.5)
        
        ship.position = SCNVector3(1.5, 1.5, -1)
        
        sceneView.scene.rootNode.addChildNode(ship)
        
    }
    
    func randomPosition(lowerBound lower:Float, upperBound upper: Float) -> Float{return Float(arc4random())/Float(UInt32.max)*(lower-upper) + upper}
    
   
    
//    override func touchesEstimatedPropertiesUpdated(_ touches: Set<UITouch>) {
//        if let touch = touches.first{
//            let location = touch.location(in: sceneView)
//            let hitList = sceneView.hitTest(location, options: nil)
//            if let hitObject = hitList.first{
//                let node = hitObject.node
//                
//                if node.name == "space_ship"{
//                    node.removeFromParentNode()
//                    addObject()
//                }
//            }
//        }
//    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Release any cached data, images, etc that aren't in use.
    }
    
    // MARK: - ARSCNViewDelegate
    
    /*
     // Override to create and configure nodes for anchors added to the view's session.
     func renderer(_ renderer: SCNSceneRenderer, nodeFor anchor: ARAnchor) -> SCNNode? {
     let node = SCNNode()
     
     return node
     }
     */
   
    
   
}

