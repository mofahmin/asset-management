<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LossReport extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'report_date',
        'discovery_date',
        'description',
        'estimated_value',
        'police_report_no',
        'police_report_date',
        'status',
        'notes',
        'asset_id',
        'masjid_id',
        'created_by_id',
        'updated_by_id',
    ];

    protected $casts = [
        'report_date' => 'datetime',
        'discovery_date' => 'datetime',
        'police_report_date' => 'datetime',
        'estimated_value' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relationships
    public function asset(): BelongsTo
    {
        return $this->belongsTo(Asset::class);
    }

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
}
