<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    protected $keyType = 'string';
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'id',
        'name',
        'email',
        'password',
        'role',
        'masjid_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    // Relationships
    public function masjid(): BelongsTo
    {
        return $this->belongsTo(Masjid::class);
    }

    // Assets created/updated by this user
    public function assetsCreated(): HasMany
    {
        return $this->hasMany(Asset::class, 'created_by_id');
    }

    public function assetsUpdated(): HasMany
    {
        return $this->hasMany(Asset::class, 'updated_by_id');
    }

    // Forms created/updated by this user
    public function formsCreated(): HasMany
    {
        return $this->hasMany(FormSubmission::class, 'created_by_id');
    }

    public function formsUpdated(): HasMany
    {
        return $this->hasMany(FormSubmission::class, 'updated_by_id');
    }

    // Maintenances created/updated by this user
    public function maintenancesCreated(): HasMany
    {
        return $this->hasMany(Maintenance::class, 'created_by_id');
    }

    public function maintenancesUpdated(): HasMany
    {
        return $this->hasMany(Maintenance::class, 'updated_by_id');
    }

    // Disposal requests created/updated by this user
    public function disposalsCreated(): HasMany
    {
        return $this->hasMany(DisposalRequest::class, 'created_by_id');
    }

    public function disposalsUpdated(): HasMany
    {
        return $this->hasMany(DisposalRequest::class, 'updated_by_id');
    }

    // Loss reports created/updated by this user
    public function lossesCreated(): HasMany
    {
        return $this->hasMany(LossReport::class, 'created_by_id');
    }

    public function lossesUpdated(): HasMany
    {
        return $this->hasMany(LossReport::class, 'updated_by_id');
    }

    // Audit logs by this user
    public function auditLogs(): HasMany
    {
        return $this->hasMany(AuditLog::class);
    }
}
