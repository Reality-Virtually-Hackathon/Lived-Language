﻿using UnityEngine;
using System.Collections;

[RequireComponent(typeof(MeshCollider))]

public class dragAndPour : MonoBehaviour
{

    private bool pour = false;

    private Vector3 screenPoint;
    private Vector3 offset;
    private bool isCorrect = false;
    private AudioSource audioSource;

    private void Awake()
    {
        if (this.gameObject.tag == "correct") {
            isCorrect = true;
        }
    }

    private void Start()
    {
        AudioSource audioSource = gameObject.AddComponent<AudioSource>();
        audioSource.PlayOneShot(Resources.Load("SFX_CORRECT") as AudioClip);
    }

    void OnMouseDown()
    {
        if (isCorrect){
            gameObject.GetComponent<AudioSource>().PlayOneShot(Resources.Load("SUGAR") as AudioClip);
            gameObject.GetComponent<AudioSource>().PlayOneShot(Resources.Load("sfx_correct") as AudioClip);
        }
        else
        {
           gameObject.GetComponent<AudioSource>().PlayOneShot(Resources.Load("sfx_incorrect") as AudioClip);
        }
        gameObject.GetComponent<AudioSource>().PlayOneShot(Resources.Load("sfx_"+gameObject.name) as AudioClip);



        screenPoint = Camera.main.WorldToScreenPoint(gameObject.transform.position);
        offset = gameObject.transform.position - Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, screenPoint.z));
    }

    void OnMouseDrag()
    {
        Vector3 cursorPoint = new Vector3(Input.mousePosition.x, Input.mousePosition.y, screenPoint.z);
        Vector3 cursorPosition = Camera.main.ScreenToWorldPoint(cursorPoint) + offset;
        transform.position = cursorPosition;
      //  transform.position.y = 1;
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