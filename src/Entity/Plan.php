<?php

namespace App\Entity;

use App\Repository\PlanRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PlanRepository::class)]
class Plan
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $tier = null;

    #[ORM\OneToOne(mappedBy: 'tier_id', cascade: ['persist', 'remove'])]
    private ?SubscriptionLimit $subscriptionLimit = null;

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

    public function getSubscriptionLimit(): ?SubscriptionLimit
    {
        return $this->subscriptionLimit;
    }

    public function setSubscriptionLimit(SubscriptionLimit $subscriptionLimit): static
    {
        // set the owning side of the relation if necessary
        if ($subscriptionLimit->getTierId() !== $this) {
            $subscriptionLimit->setTierId($this);
        }

        $this->subscriptionLimit = $subscriptionLimit;

        return $this;
    }
}
