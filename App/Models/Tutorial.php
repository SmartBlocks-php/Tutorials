<?php

namespace Tutorials;

/**
 * @Entity @Table(name="tutorials_tutorial")
 */
class Tutorial extends Model
{
    /**
     * @Id @GeneratedValue(strategy="AUTO") @Column(type="integer")
     */
    public $id;

    /**
     * @ManyToOne(targetEntity="\User")
     */
    private $creator;

    /**
     * @Column(type="text")
     */
    private $content;

    /**
     * @Column(type="string")
     */
    private $title;

    /**
     * @Column(type="datetime")
     */
    private $created;

    /**
     * @Column(type="datetime")
     */
    private $last_update;

    public function __construct()
    {
        $this->creator = \User::current_user();
        $this->title = "";
        $this->content = "";
        $this->created = new \DateTime();
        $this->last_update = new \DateTime();
    }

    public function getId()
    {
        return $this->id;
    }

    /**
     * @param string $content
     */
    public function setContent($content)
    {
        $this->content = $content;
    }

    /**
     * @return string
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * @param \User $creator
     */
    public function setCreator($creator)
    {
        $this->creator = $creator;
    }

    /**
     * @return \User
     */
    public function getCreator()
    {
        return $this->creator;
    }

    /**
     * @param string $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param \DateTime $last_update
     */
    public function setLastUpdate($last_update)
    {
        $this->last_update = $last_update;
    }

    /**
     * @return \DateTime
     */
    public function getLastUpdate()
    {
        return $this->last_update;
    }

    /**
     * @param \DateTime $created
     */
    public function setCreated($created)
    {
        $this->created = $created;
    }

    /**
     * @return \DateTime
     */
    public function getCreated()
    {
        return $this->created;
    }



    public function toArray()
    {
        $array = array(
            "id" => $this->id,
            "title" => $this->title,
            "content" => $this->content,
            "creator" => $this->creator->toArray(),
            "created" => $this->created,
            "last_update" => $this->last_update
        );

        return $array;
    }
}

