﻿using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tiga.Controllers.Resources;
using Tiga.Models;

namespace Tiga.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //Domain to API Resource
            CreateMap<Make, MakeResource>();
            CreateMap<Make, KeyValuePairResource>();
            CreateMap<Model, KeyValuePairResource>();
            CreateMap<Feature, KeyValuePairResource>();
            CreateMap<Vehicle, SaveVehicleResource>()
                .ForMember(vh => vh.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.ContactName, Email = v.ContactEmail, Phone = v.ContactPhone }))
                .ForMember(vh => vh.Features, opt => opt.MapFrom(v => v.Features.Select(f => f.FeatureId)));           
            CreateMap<Vehicle, VehicleResource>()
                .ForMember(vh => vh.Make, opt => opt.MapFrom(v => v.Model.Make))
                .ForMember(vh => vh.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.ContactName, Email = v.ContactEmail, Phone = v.ContactPhone }))
                .ForMember(vh => vh.Features, opt => opt.MapFrom(v => v.Features.Select(f => new KeyValuePairResource { Id = f.Feature.Id , Name = f.Feature.Name })));


            //API Resource to Domain
            CreateMap<SaveVehicleResource, Vehicle>()
                .ForMember(v =>v.Id, opt => opt.Ignore())
                .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
                .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
                .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
                .ForMember(v => v.Features, opt => opt.Ignore())
                .AfterMap((vr,v) => {

                    //Remove unselected features

                    //var removedFeatures = new List<VehicleFeature>();

                    //foreach (var f in v.Features)
                    //{
                    //    if (!vr.Features.Contains(f.FeatureId))
                    //        v.Features.Add(f);
                    //}

                    var removedFeatures = v.Features.Where(f => !vr.Features.Contains(f.FeatureId)).ToList();
                    foreach (var f in removedFeatures)
                        v.Features.Remove(f);

                    // Add new features
                    //foreach (var id in vr.Features)
                    //{
                    //    if(!v.Features.Any(f => f.FeatureId == id))
                    //        v.Features.Add(new VehicleFeature { FeatureId = id});
                    //}

                   var newFeatures = vr.Features.Where(id => !v.Features.Any(f => f.FeatureId == id)).ToList();
                    foreach (var id in newFeatures)
                    {
                        v.Features.Add(new VehicleFeature { FeatureId = id });
                    }
                });
        }
    }
}