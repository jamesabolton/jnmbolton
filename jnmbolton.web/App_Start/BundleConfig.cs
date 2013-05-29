using System.Web;
using System.Web.Optimization;

namespace jnmbolton.web
{
	public class BundleConfig
	{
		// For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Add(new ScriptBundle("~/bundles/main/js").Include(
						"~/Scripts/Vendor/jQuery/jquery-{version}.js",
						"~/Scripts/Vendor/jQuery/validation/jquery.validate.js",
						"~/Scripts/Vendor/jQuery/validation/jquery.validate.unobtrusive.js",
						"~/Scripts/Vendor/jQuery/plugins/jquery.unobtrusive-ajax.js",
						"~/Scripts/Vendor/jQuery/plugins/jquery.easing.{version}.js",
						"~/Scripts/Vendor/jQuery/plugins/jquery.relatedtweets-{version}.js",
						"~/Scripts/Vendor/jQuery/plugins/jquery.mCustomScrollbar.js",
						"~/Scripts/Vendor/jQuery/plugins/jquery.simple-progress-bar.js",
						"~/Scripts/Vendor/jQuery/plugins/jquery.masonry.js",
						"~/Scripts/Vendor/jQuery/plugins/jquery.prettyPhoto.js",
						"~/Scripts/Vendor/jQuery/plugins/jquery.gmap.js",
						"~/Scripts/Vendor/jQuery/plugins/jquery.flexslider.js",
						"~/Scripts/Misc/heartcode-canvasloader.js",
						"~/Scripts/Misc/modernizr-{version}.js",
						"~/Scripts/Controllers/main.js"));

			bundles.Add(new StyleBundle("~/bundles/main/css").Include(
						"~/Content/Styles/Common/style.css",
						"~/Content/Styles/Common/dark.css",
						"~/Content/Styles/Vendor/jQuery/plugins/jquery.mCustomScrollbar.css",
						"~/Content/Styles/Vendor/jQuery/plugins/jquery.flexslider.css",
						"~/Content/Styles/Vendor/jQuery/plugins/jquery.prettyPhoto.css",
						"~/Content/Styles/Vendor/jQuery/plugins/jquery.plugins.css",
						"~/Content/Styles/Misc/font-awesome.css"));

			bundles.Add(new ScriptBundle("~/bundles/controller/home/index").Include(
						));
		}
	}
}