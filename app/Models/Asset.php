<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Asset extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'asset_id',
        'name',
        'description',
        'type',
        'category',
        'acquisition_date',
        'acquisition_method',
        'value',
        'location',
        'serial_number',
        'status',
        'qr_code',
        'masjid_id',
        'created_by_id',
        'updated_by_id',
    ];

    protected $casts = [
        'acquisition_date' => 'datetime',
        'value' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relationships
    public function masjid(): BelongsTo
    {
        return $this->belongsTo(Masjid::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by_id');
    }

    // Asset lifecycle relations
    public function assetMovements(): HasMany
    {
        return $this->hasMany(AssetMovement::class);
    }

    public function maintenances(): HasMany
    {
        return $this->hasMany(Maintenance::class);
    }

    public function disposalRequests(): HasMany
    {
        return $this->hasMany(DisposalRequest::class);
    }

    public function lossReports(): HasMany
    {
        return $this->hasMany(LossReport::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(AssetDocument::class);
    }
}
