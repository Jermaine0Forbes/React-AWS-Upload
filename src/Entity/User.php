<?php

namespace App\Entity;

use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: 'users', options: ["engine" => "InnoDB"])]
#[ORM\Index(columns: ['tier_id'])]
class User implements PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $username = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    #[ORM\ManyToOne(targetEntity: Plan::class, inversedBy: 'user')]
    #[ORM\JoinColumn(name: 'tier_id', referencedColumnName: 'id')]
    private ?Plan $tier = null;

    #[ORM\OneToOne(mappedBy: 'user', cascade: ['persist', 'remove'])]
    private ?SubscriptionLimit $subscriptionLimit = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updated_at = null;

    /**
     * @var Collection<int, Content>
     */
    #[ORM\OneToMany(targetEntity: Content::class, mappedBy: 'user', orphanRemoval: true)]
    private Collection $contents;

    #[ORM\Column(type: 'integer')]
    #[ORM\JoinColumn(nullable: false)]
    private ?int $tier_id = null;

    public function __construct()
    {
        $this->contents = new ArrayCollection();
        $this->created_at = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getTier(): ?Plan
    {
        return $this->tier;
    }

    public function setTier(?Plan $tier): static
    {
        $this->tier = $tier;
        $this->tier_id = $tier ? $tier->getId() : null;

        return $this;
    }

    public function getTierId(): ?int
    {
        return $this->tier_id;
    }

    public function setTierId(?int $tier_id): static
    {
        $this->tier_id = $tier_id;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(): void
    {
        $this->updated_at = new \DateTimeImmutable();
    }

    /**
     * @return Collection<int, Content>
     */
    public function getContents(): Collection
    {
        return $this->contents;
    }

    public function addContent(Content $content): static
    {
        if (!$this->contents->contains($content)) {
            $this->contents->add($content);
            $content->setUser($this);
        }

        return $this;
    }

    public function removeContent(Content $content): static
    {
        if ($this->contents->removeElement($content)) {
            // set the owning side to null (unless already changed)
            if ($content->getUserId() === $this) {
                $content->setUserId(null);
            }
        }

        return $this;
    }

    public function getSubscriptionLimit(): ?SubscriptionLimit
    {
        return $this->subscriptionLimit;
    }

    public function setSubscriptionLimit(SubscriptionLimit $subscriptionLimit): static
    {
        // set the owning side of the relation if necessary
        if ($subscriptionLimit->getUser() !== $this) {
            $subscriptionLimit->setUser($this);
        }

        $this->subscriptionLimit = $subscriptionLimit;

        return $this;
    }

    public function getProfileData(): array
    {
        return [
            'id' => $this->getId(),
            'username' => $this->getUsername(),
            'email' => $this->getEmail(),
            'tier' => $this->getTier() ? $this->getTier()->getTier() : null,
            'max' => $this->getTier() ? $this->getTier()->getValue() : null,
            'current' => $this->getSubscriptionLimit() ? $this->getSubscriptionLimit()->getCurrent() : null,
            'created_at' => $this->getCreatedAt(),
        ];
    }   


    
    public function getQuota(): array
    {
        $max= $this->getTier() ? $this->getTier()->getValue() : 0;
        $current= $this->getSubscriptionLimit() ? $this->getSubscriptionLimit()->getCurrent() : 0;
        $remainder= $max - $current;
        return [
            'max' => $max,
            'current' => $current,
            'remainder' => $remainder,
        ];
    }  
}
