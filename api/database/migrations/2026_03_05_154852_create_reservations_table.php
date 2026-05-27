<?php

use App\Models\Computer;
use App\Models\TimeSlot;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->foreignIdFor(User::class)->constrained();
            $table->foreignIdFor(Computer::class)->constrained();
            $table->foreignIdFor(TimeSlot::class)->constrained();
            $table->date('date');
            $table->enum('status', ['confirmed', 'cancelled']);
            $table->decimal('total_price', 5, 2);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
