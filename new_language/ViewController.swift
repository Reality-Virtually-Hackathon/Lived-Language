//
//  ViewController.swift
//  new_language
//
//  Created by Forrest on 10/7/17.
//  Copyright © 2017 Forrest. All rights reserved.
//

import UIKit
import SceneKit
import ARKit


class ViewController: UIViewController {
    @IBOutlet weak var sceneView: ARSCNView!
    
    @IBOutlet weak var vocab: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        // Create a new scene
        let scene = SCNScene()
        
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
    
    func addObject(){
        let spaceship = ship()
        spaceship.loadModal()
        let xPos = randomPostion(lowerBound: -1.5, upperBound: 1.5)
        let yPos = randomPostion(lowerBound: -1.5, upperBound: 1.5)
        
        spaceship.position = SCNVector3(xPos, yPos, -1)
        sceneView.scene.rootNode.addChildNode(spaceship)
    }
    
    func randomPostion(lowerBound lower:Float, upperBound upper: Float) -> Float{return Float(arc4random())/Float(UInt32.max)*(lower-upper) + upper}
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        
        // Pause the view's session
        sceneView.session.pause()
    }
    
    override func touchesEstimatedPropertiesUpdated(_ touches: Set<UITouch>) {
        if let touch = touches.first{
            let location = touch.location(in: sceneView)
            let hitList = sceneView.hitTest(location, options: nil)
            if let hitObject = hitList.first{
                let node = hitObject.node
                
                if node.name == "space_ship"{
                    node.removeFromParentNode()
                    addObject()
                }
            }
        }
    }
    
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
    
    func session(_ session: ARSession, didFailWithError error: Error) {
        // Present an error message to the user
        
    }
    
    func sessionWasInterrupted(_ session: ARSession) {
        // Inform the user that the session has been interrupted, for example, by presenting an overlay
        
    }
    
    func sessionInterruptionEnded(_ session: ARSession) {
        // Reset tracking and/or remove existing anchors if consistent tracking is required
        
    }
    
   
}

