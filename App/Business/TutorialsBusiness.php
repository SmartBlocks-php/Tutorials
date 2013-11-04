<?php
/**
 * Created by Antoine Jackson
 * User: Antoine Jackson
 * Date: 11/4/13
 * Time: 2:19 PM
 */

namespace Tutorials;

/**
 * Class TutorialsBusiness
 * @package Tutorials
 */
class TutorialsBusiness
{
    /**
     * @param $id
     * @return Tutorial
     */
    public static function getTutorial($id)
    {
        $tutorial = Tutorial::find($id);
        return $tutorial;
    }


    /**
     * @return Tutorial[]
     */
    public static function getTutorials()
    {
        $tutorials = Tutorial::all();
        return $tutorials;
    }

    /**
     * @param $data
     * @return Tutorial
     */
    public static function addOrUpdate($data)
    {
        if (isset($data["id"]))
        {
            $tutorial = Tutorial::find($data["id"]);
        }

        if (!isset($tutorial) || !is_object($tutorial))
        {
            $tutorial = new Tutorial();

        }


        if (isset($data["title"]))
        {
            $tutorial->setTitle($data["title"]);
        }

        if (isset($data["content"]))
        {
            $tutorial->setContent($data["content"]);
        }

        $tutorial->setLastUpdate(new \DateTime());
        $tutorial->save();

        return $tutorial;

    }

    /**
     * @param Tutorial $tutorial
     */
    public static function deleteTutorial($tutorial)
    {
        $tutorial->delete();
    }
} 