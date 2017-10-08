﻿using UnityEngine;
using System.Collections;

[RequireComponent(typeof(MeshCollider))]

public class dragAndPour : MonoBehaviour
{

    private bool pour = false;

    private Vector3 screenPoint;
    private Vector3 offset;
    private bool isCorrect = false;

    private void Awake()
    {
        if (this.gameObject.tag == "correct") {
            isCorrect = true;
        }
    }

    void OnMouseDown()
    {
        screenPoint = Camera.main.WorldToScreenPoint(gameObject.transform.position);
        offset = gameObject.transform.position - Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, screenPoint.z));
    }

    void OnMouseDrag()
    {
        Vector3 cursorPoint = new Vector3(Input.mousePosition.x, Input.mousePosition.y, screenPoint.z);
        Vector3 cursorPosition = Camera.main.ScreenToWorldPoint(cursorPoint) + offset;
        transform.position = cursorPosition;
    }

    void OnTriggerEnter(Collider other)
    {
        if (other.gameObject.name == "mug")
        {
            if (isCorrect)
            {
                if (transform.position.x < other.transform.position.x)
                {
                    this.gameObject.transform.Rotate(0, 0, -10);
                }
                else
                {
                    this.gameObject.transform.Rotate(0, 0, 10);
                }
            }
        }
    }

    void OnTriggerExit(Collider other)
    {
        if (other.gameObject.name == "mug")
        {
            if (isCorrect)
            {
                if (transform.position.x < other.transform.position.x)
                {
                    this.gameObject.transform.Rotate(0, 0, 10);
                }
                else
                {
                    this.gameObject.transform.Rotate(0, 0, -10);
                }
            }
        }
    }
}