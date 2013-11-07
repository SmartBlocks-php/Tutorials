<?php
/**
 * Created by Antoine Jackson
 * User: Antoine Jackson
 * Date: 11/7/13
 * Time: 9:39 PM
 */

namespace Tutorials;


/**
 * @Entity @Table(name="tutorials_categories")
 */
class Category extends \Model {
    /**
     * @Id @GeneratedValue(strategy="AUTO") @Column(type="integer")
     */
    public $id;

    /**
     * @ManyToOne(targetEntity="\User")
     */
    private $creator;

    /**
     * @Column(type="string")
     */
    private $name;

    /**
     * @OneToMany(targetEntity="\Tutorials\Tutorial", mappedBy="category")
     */
    private $tutorials;

    /**
     * @Column(type="datetime")
     */
    private $created;

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
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param \Doctrine\Common\Collections\ArrayCollection
     */
    public function setTutorials($tutorials)
    {
        $this->tutorials = $tutorials;
    }

    /**
     * @return \Doctrine\Common\Collections\ArrayCollection
     */
    public function getTutorials()
    {
        return $this->tutorials;
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




}