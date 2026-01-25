<?php

namespace App\Entity;

use App\Repository\PlanRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: PlanRepository::class)]
#[ORM\Table(options: ["engine" => "InnoDB"])]
class Plan
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 25)]
    private ?string $tier = null;

    /**
     * @var Collection<int, User>
     */
    #[ORM\OneToMany(mappedBy: 'tier', targetEntity: User::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    private Collection $users;

    // #[ORM\ManyToOne(targetEntity: SubscriptionLimit::class, inversedBy: 'tiers', cascade: ['persist', 'remove'])]
    // #[ORM\JoinColumn( referencedColumnName: 'id', nullable: false)]
    // private ?SubscriptionLimit $subscriptionLimit = null;

    #[ORM\Column]
    private ?int $value = null;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }


    public function getTier(): ?string
    {
        return $this->tier;
    }

    public function setTier(string $tier): static
    {
        $this->tier = $tier;

        return $this;
    }

    // public function getSubscriptionLimit(): ?SubscriptionLimit
    // {
    //     return $this->subscriptionLimit;
    // }

    // public function setSubscriptionLimit(SubscriptionLimit $subscriptionLimit): static
    // {
    //     // set the owning side of the relation if necessary
    //     if ($subscriptionLimit->getTier($this->getId()) !== $this) {
    //         $subscriptionLimit->setTier($this);
    //     }

    //     $this->subscriptionLimit = $subscriptionLimit;

    //     return $this;
    // }

    public function getValue(): ?int
    {
        return $this->value;
    }

    public function setValue(int $value): static
    {
        $this->value = $value;

        return $this;
    }


    /**
     * @return Collection<int, User>
     */
    public function getUsers(): ?Collection
    {
        return $this->users;
    }

    // public function setUser(User $user): static
    // {
    //     $this->user = $user;

    //     return $this;
    // }
}
