<?php

namespace App\Entity;

use App\Repository\SubscriptionLimitRepository;
use Doctrine\ORM\Mapping as ORM;
// use Doctrine\Common\Collections\ArrayCollection;
// use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: SubscriptionLimitRepository::class)]
#[ORM\Table(options: ["engine" => "InnoDB"])]
#[ORM\Index(columns: ['tier_id'])]
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

    #[ORM\OneToOne(targetEntity: User::class, inversedBy: 'subscriptionLimit', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(name: 'user_id', referencedColumnName: 'id', nullable: false)]
    private ?User $user = null;

    #[ORM\Column]
    private ?int $user_id = null;

    #[ORM\Column(type: 'integer')]
    #[ORM\JoinColumn(name: 'tier_id', referencedColumnName: 'id',nullable: false)]
    private ?int $tier_id = null;

    private ?Plan $tier = null;

    // #[ORM\JoinColumn(name: 'tier_id', referencedColumnName: 'id', nullable: false)]
    // /**
    //  * @var Collection<int, Plan>
    //  */
    // #[ORM\OneToMany(targetEntity: Plan::class, mappedBy: 'subscriptionLimit', cascade: ['persist', 'remove'])]
    // private Collection $tiers;

    #[ORM\Column]
    private ?\DateTime $created_at = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTime $updated_at = null;

    public function __construct()
    {
        $this->created_at = new \DateTime();
        // $this->tiers = new ArrayCollection();
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

    public function incrementCurrent(int $incrementBy = 1): static
    {
        $this->current += $incrementBy;

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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): static
    {
        $this->user = $user;
        $this->user_id = $user->getId();

        return $this;
    }

    public function getUserId(): ?int
    {
        return $this->user_id;
    }

    public function setUserId(int $user_id): static
    {
        $this->user_id = $user_id;

        return $this;
    }


    public function getTier(): ?Plan
    {
        if(empty($this->tier)){
            $this->tier = $this->getUser()->getTier();
        }
        return $this->tier ;
    }

    public function setTier(Plan $tier): static
    {
        $this->tier = $tier;
        $this->tier_id = $tier->getId();

        return $this;
    }

    // /**
    //  * @return Collection<int, Plan>
    //  */
    // public function getTiers(): ?Collection
    // {
    //     return $this->tiers;
    // }

    public function getTierId(): ?int
    {
        return $this->tier_id;
    }

    public function setTierId(int $tier_id): static
    {
        $this->tier_id = $tier_id;

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
