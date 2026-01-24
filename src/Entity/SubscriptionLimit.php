<?php

namespace App\Entity;

use App\Repository\SubscriptionLimitRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SubscriptionLimitRepository::class)]
class SubscriptionLimit
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(options: ['default' => 0])]
    private ?int $max = 0;

    #[ORM\Column(nullable: true, options: ['default' => 0])]
    private ?int $current = 0;

    #[ORM\Column(nullable: true)]
    private ?\DateTime $expiration_date = null;

    #[ORM\OneToOne(inversedBy:'subscriptionLimit', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\OneToOne(inversedBy: 'subscriptionLimit', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Plan $tier = null;

    #[ORM\Column]
    private ?\DateTime $created_at = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTime $updated_at = null;

    public function __construct()
    {
        $this->created_at = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMax(): ?int
    {
        return $this->max;
    }

    public function setMax(int $max): static
    {
        $this->max = $max;

        return $this;
    }

    public function getCurrent(): ?int
    {
        return $this->current;
    }

    public function setCurrent(?int $current): static
    {
        $this->current = $current;

        return $this;
    }

    public function getExpirationDate(): ?\DateTime
    {
        return $this->expiration_date;
    }

    public function setExpirationDate(?\DateTime $expiration_date): static
    {
        $this->expiration_date = $expiration_date;

        return $this;
    }

    public function getUserId(): ?int
    {
        return $this->user;
    }

    public function setUserId(User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getTierId(): ?Plan
    {
        return $this->tier;
    }

    public function setTierId(Plan $tier): static
    {
        $this->tier = $tier;

        return $this;
    }

    public function getCreatedAt(): ?\DateTime
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTime $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTime
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(): void
    {
        $this->updated_at = new \DateTime();

    }
}
