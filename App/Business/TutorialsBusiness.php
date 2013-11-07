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
            unset($data["id"]);
        }

        if (!isset($tutorial) || !is_object($tutorial))
        {
            $tutorial = new Tutorial();

        }


        if (isset($data["title"]))
        {
            $tutorial->setTitle($data["title"]);
            unset($data["title"]);
        }

        if (isset($data["content"]))
        {
            $tutorial->setContent($data["content"]);
            unset($data["content"]);
        }

        $tutorial->setLastUpdate(new \DateTime());

        if (isset($data["created"]))
        {
            unset($data["created"]);
        }

        if (isset($data["last_update"]))
        {
            unset($data["last_update"]);
        }

        if (isset($data["category"]) && is_array($data["category"]))
        {
            $category = CategoriesBusiness::getCategory($data["category"]["id"]);
            if (is_object($category))
            {
                $tutorial->setCategory($category);
            }
            unset($data["category"]);
        }

        $tuto_data = $data;
        $data_array = $tutorial->getData();

        if (is_array($tuto_data))
        {
            foreach ($tuto_data as $key => $d)
            {
                $data_array[$key] = $d;
            }

        }

        foreach ($data_array as $key => $d)
        {
            if (!isset($event_data[$key]))
            {
                unset($data_array[$key]);
            }
        }
        $tutorial->setData($data_array);


        if ($tutorial->getCreator() == \User::current_user())
        {
            $tutorial->save();

            return $tutorial;
        }
        else
        {
            return null;
        }
    }

    /**
     * @param Tutorial $tutorial
     */
    public static function deleteTutorial($tutorial)
    {
        $tutorial->delete();
    }
} 