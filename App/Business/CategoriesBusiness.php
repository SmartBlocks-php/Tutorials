<?php
/**
 * Created by Antoine Jackson
 * User: Antoine Jackson
 * Date: 11/4/13
 * Time: 2:19 PM
 */

namespace Tutorials;

/**
 * Class CategoriesBusiness
 * @package Tutorials
 */
class CategoriesBusiness
{
    /**
     * @param $id
     * @return Category
     */
    public static function getCategory($id)
    {
        $tutorial = Category::find($id);
        return $tutorial;
    }


    /**
     * @return Category[]
     */
    public static function getCategories()
    {
        $categories = Category::all();
        return $categories;
    }

    /**
     * @param array
     * @return Category
     */
    public static function addOrUpdate($data)
    {

        if (isset($data["id"]))
        {
            $category = Category::find($data["id"]);
            unset($data["id"]);
        }

        if (!isset($category) || !is_object($category))
        {
            $category = new Category();

        }


        if (isset($data["name"]))
        {
            $category->setName($data["name"]);
            unset($data["name"]);
        }

        if ($category->getCreated() == null)
            $category->setCreated(new \DateTime());

        if (isset($data["created"]))
        {
            unset($data["created"]);
        }

        if ($category->getCreator() == \User::current_user())
        {
            $category->save();

            return $category;
        }
        else
        {
            return null;
        }
    }

    /**
     * @param Category $category
     */
    public static function deleteCategory($category)
    {
        $category->delete();
    }
} 