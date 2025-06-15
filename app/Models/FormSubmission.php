<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FormSubmission extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'form_id',
        'form_type',
        'title',
        'content',
        'status',
        'submitted_date',
        'approved_date',
        'rejected_date',
        'notes',
        'masjid_id',
        'created_by_id',
        'updated_by_id',
    ];

    protected $casts = [
        'content' => 'array',
        'submitted_date' => 'datetime',
        'approved_date' => 'datetime',
        'rejected_date' => 'datetime',
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

    public function documents(): HasMany
    {
        return $this->hasMany(FormDocument::class, 'form_id');
    }
}
