<?php
/**
 * Created by Antoine Jackson
 * User: Antoine Jackson
 * Date: 11/4/13
 * Time: 2:18 PM
 */

namespace Tutorials;

class TutorialsController extends \Controller
{
    public function index()
    {
        $tutorials = TutorialsBusiness::getTutorials();

        $response = array();

        foreach ($tutorials as $tutorial)
        {
            $response[] = $tutorial->toArray();
        }

        $this->return_json($response);
    }

    public function show($params = array())
    {
        $tutorial = TutorialsBusiness::getTutorial($params["id"]);
        if (is_object($tutorial))
        {
            $this->return_json($tutorial->toArray());
        }
        else
        {
            $this->json_error("Tutorial not found", 404);
        }
    }

    public function create($params = array())
    {
        $data = $this->getRequestData();

        if (\User::current_user()->hasRight("tutorial_writer"))
        {
            $tutorial = TutorialsBusiness::addOrUpdate($data);
        }

        $this->return_json($tutorial->toArray());
    }

    public function update($params = array())
    {
        $data = $this->getRequestData();
        if (isset($params["id"]))
        {
            $data["id"] = $params["id"];
        }
        $tutorial = TutorialsBusiness::addOrUpdate($data);

        if (is_object($tutorial))
        {
            $this->return_json($tutorial->toArray());
        }
        else
        {
            $this->json_error("Tutorial not found", 404);
        }

    }

    public function destroy($params = array())
    {
        $tutorial = TutorialsBusiness::getTutorial($params["id"]);
        if (is_object($tutorial) && $tutorial->getCreator() == \User::current_user())
        {
            TutorialsBusiness::deleteTutorial($tutorial);
        }
        else
        {
            $this->json_error("Tutorial not found", 404);
        }
    }

}