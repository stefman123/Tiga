using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Tiga.Controllers.Resources;
using Tiga.Core;
using Tiga.Core.Repositories;
using Tiga.Models;

namespace Tiga.Controllers
{
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller
    {
        private readonly IWebHostEnvironment host;
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly int MAX_BYTES = 10 * 1024 * 1024;
        private readonly string[] ACCEPTED_FILE_TYPES = new[] { ".jpg", ".jpeg", ".png" };


        public PhotosController(IWebHostEnvironment host, IVehicleRepository repository , IUnitOfWork unitOfWork, IMapper mapper )
        {
            this.host = host;
            this.repository = repository;
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile formFile)
        {

            var vehicle = await repository.GetById(vehicleId, includeRelated: false);
            if (vehicle == null)
            {
                return NotFound();
            }

            if (formFile == null) return BadRequest("Null file");
            if (formFile.Length == 0) return BadRequest("Empty file");
            if (formFile.Length > MAX_BYTES) return BadRequest("Max file size exceeded");
            if (!ACCEPTED_FILE_TYPES.Any(s => s == Path.GetExtension(formFile.FileName))) return BadRequest("Invalid file type");


            var uploadFolderPath = Path.Combine(host.WebRootPath, "uploads");

            if (!Directory.Exists(uploadFolderPath))
            {
                Directory.CreateDirectory(uploadFolderPath);
            }

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(formFile.FileName);
            var filePath = Path.Combine(uploadFolderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await formFile.CopyToAsync(stream);
            }

            var photo = new Photo { FileName = fileName };

            vehicle.Photos.Add(photo);

            await unitOfWork.CompleteAsync();

            return Ok(mapper.Map<Photo,PhotoResource>(photo));
        }
    }
}
