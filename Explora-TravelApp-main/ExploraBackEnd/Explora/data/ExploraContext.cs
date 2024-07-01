using System;
using System.Collections.Generic;
using Explora.Entity;
using Microsoft.EntityFrameworkCore;

namespace Explora.data;

public partial class ExploraContext : DbContext
{
    public ExploraContext()
    {
    }

    public ExploraContext(DbContextOptions<ExploraContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TAirline> TAirlines { get; set; }

    public virtual DbSet<TBillRoom> TBillRooms { get; set; }

    public virtual DbSet<TBu> TBus { get; set; }

    public virtual DbSet<TBusTicket> TBusTickets { get; set; }

    public virtual DbSet<THotel> THotels { get; set; }

    public virtual DbSet<TNhaXe> TNhaXes { get; set; }

    public virtual DbSet<TOrderBu> TOrderBus { get; set; }

    public virtual DbSet<TOrderPlane> TOrderPlanes { get; set; }

    public virtual DbSet<TPlane> TPlanes { get; set; }

    public virtual DbSet<TPlaneTicket> TPlaneTickets { get; set; }

    public virtual DbSet<TRole> TRoles { get; set; }

    public virtual DbSet<TRoleUser> TRoleUsers { get; set; }

    public virtual DbSet<TRoom> TRooms { get; set; }

    public virtual DbSet<TUser> TUsers { get; set; }
    public virtual DbSet<TRoomType> TRoomTypes { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TRoom>().HasOne<THotel>(t => t.Hotel).WithMany(t => t.TRooms)
            .HasForeignKey(t => t.HotelId).OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<TBillRoom>().HasOne<TUser>(t => t.User).WithMany(t => t.TBillRooms)
            .HasForeignKey(t => t.UserId).OnDelete(DeleteBehavior.Restrict);
        modelBuilder.Entity<TRoomType>().HasOne<THotel>(t => t.hotel).WithMany(t => t.RoomTypes)
            .HasForeignKey(t => t.HotelId).OnDelete(DeleteBehavior.Restrict);
    }

 }
