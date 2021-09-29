using System.ComponentModel.DataAnnotations.Schema;

namespace Tiga.Models
{
    [Table("VehicleFeatures")]
    public class VehicleFeature
    {
        public Vehicle Vehicle { get; set; }
        public int VehicleId { get; set; }

        public Feature Feature { get; set; }

        public int FeatureId { get; set; }
    }
}
