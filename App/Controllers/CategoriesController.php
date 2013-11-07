<?php
/**
 * Created by Antoine Jackson
 * User: Antoine Jackson
 * Date: 11/4/13
 * Time: 2:18 PM
 */

namespace Tutorials;

class CategoriesController extends \Controller
{
    public function index()
    {
        $categories = CategoriesBusiness::getCategories();

        $response = array();
        foreach ($categories as $category)
        {
            $response[] = $category->toArray();
        }

        $this->return_json($response);
    }

    public function show($params = array())
    {
        $category = CategoriesBusiness::getCategory($params["id"]);
        if (is_object($category))
        {
            $this->return_json($category->toArray());
        }
        else
        {
            $this->json_error("Category not found", 404);
        }
    }

    public function create($params = array())
    {
        $data = $this->getRequestData();

        if (\User::current_user()->hasRight("tutorial_writer"))
        {
            $category = CategoriesBusiness::addOrUpdate($data);
            $this->return_json($category->toArray());
        }
        else
        {
            $this->json_error("You don't have the right to create a category");
        }


    }

    public function update($params = array())
    {
        $data = $this->getRequestData();
        if (isset($params["id"]))
        {
            $data["id"] = $params["id"];
        }
        $category = CategoriesBusiness::addOrUpdate($data);

        if (is_object($category))
        {
            $this->return_json($category->toArray());
        }
        else
        {
            $this->json_error("Category not found", 404);
        }

    }

    public function destroy($params = array())
    {
        $category = CategoriesBusiness::getCategory($params["id"]);
        if (is_object($category) && $category->getCreator() == \User::current_user())
        {
            CategoriesBusiness::deleteCategory($category);
        }
        else
        {
            $this->json_error("Category not found", 404);
        }
    }

}