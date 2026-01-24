<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260124065655 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE content (id INT AUTO_INCREMENT NOT NULL, path VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, views INT DEFAULT 0 NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, user_id_id INT NOT NULL, INDEX IDX_FEC530A99D86650F (user_id_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE plan (id INT AUTO_INCREMENT NOT NULL, tier VARCHAR(100) NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE subscription_limit (id INT AUTO_INCREMENT NOT NULL, max INT DEFAULT 0 NOT NULL, current INT DEFAULT 0, expiration_date DATETIME DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, user_id INT NOT NULL, tier_id INT NOT NULL, UNIQUE INDEX UNIQ_85AEE913A76ED395 (user_id), UNIQUE INDEX UNIQ_85AEE913A354F9DC (tier_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE users (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(255) NOT NULL, email VARCHAR(255) DEFAULT NULL, password VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, tier_id INT DEFAULT NULL, UNIQUE INDEX UNIQ_1483A5E9A354F9DC (tier_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE content ADD CONSTRAINT FK_FEC530A99D86650F FOREIGN KEY (user_id_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE subscription_limit ADD CONSTRAINT FK_85AEE913A76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE subscription_limit ADD CONSTRAINT FK_85AEE913A354F9DC FOREIGN KEY (tier_id) REFERENCES plan (id)');
        $this->addSql('ALTER TABLE users ADD CONSTRAINT FK_1483A5E9A354F9DC FOREIGN KEY (tier_id) REFERENCES plan (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE content DROP FOREIGN KEY FK_FEC530A99D86650F');
        $this->addSql('ALTER TABLE subscription_limit DROP FOREIGN KEY FK_85AEE913A76ED395');
        $this->addSql('ALTER TABLE subscription_limit DROP FOREIGN KEY FK_85AEE913A354F9DC');
        $this->addSql('ALTER TABLE users DROP FOREIGN KEY FK_1483A5E9A354F9DC');
        $this->addSql('DROP TABLE content');
        $this->addSql('DROP TABLE plan');
        $this->addSql('DROP TABLE subscription_limit');
        $this->addSql('DROP TABLE users');
    }
}
