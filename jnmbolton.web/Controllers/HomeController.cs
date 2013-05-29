using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using jnmbolton.web.core.ViewModels;
using jnmbolton.web.Properties;
using Newtonsoft.Json;
using jnmbolton.web.core.Infrastructure;
namespace jnmbolton.web.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			if (Request.IsAjaxRequest())
			{
				return PartialView("Index");
			}
			else
			{
				return View();
			}
		}

		public ActionResult About()
		{
			return PartialView("About");
		}

		public ActionResult Contact()
		{
			return PartialView("Contact");
		}

		[HttpPost]
		[ValidateAntiForgeryToken]
		public ActionResult Contact(ContactForm contactForm)
		{
			JsonNetResult jsonNetResult = new JsonNetResult();
			jsonNetResult.Formatting = Formatting.Indented;
			try
			{
				string subject = "Online Contact From " + contactForm.Name;
				string message = contactForm.Message;
				message += "\r\n\r\n  " + contactForm.Name;
				message += "\r\n   " + contactForm.EmailAddress;
				message += "\r\n   " + contactForm.Number;

				string sendto = Settings.Default.ContactEmail;

				EmailMessage Message = new EmailMessage()
				{
					Message = message,
					Subject = subject,
					EmailAddressFrom = contactForm.EmailAddress,
					ContactName = contactForm.Name,
					EmailAddressTo = sendto
				};
				Message.SendMessage();
				Message = null;

				jsonNetResult.Data = new { Result = "success" };
			}
			catch (Exception ex)
			{
				jsonNetResult.Data = new { Result = "fail", Message = ex.Message };
			}
			return jsonNetResult;
		}

		public ActionResult Portfolio()
		{
			return PartialView("Portfolio");
		}

		public ActionResult Resume()
		{
			return PartialView("Resume");
		}
	}
}
