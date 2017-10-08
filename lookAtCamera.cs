using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class lookAtCamera : MonoBehaviour
{
    public Camera cameraToLookAt;

    void Awake()
    {
        cameraToLookAt = GameObject.FindWithTag("MainCamera").GetComponent<Camera>();
    }

    void Start()
    {

    }

    void Update()
    {
        Vector3 v = cameraToLookAt.transform.position - transform.position;
        v.x = v.z = 0.0f;
        transform.LookAt(cameraToLookAt.transform.position - v);
        transform.Rotate(0, 180, 0);
    }
}
