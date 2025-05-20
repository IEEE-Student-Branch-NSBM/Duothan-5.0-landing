import RegistrationBannerDesktop from "./RegistrationBannerDesktop";
import RegistrationBannerMobile from "./RegistrationBannerMobile";

function RegistrationBanner() {
	return (
		<>
			<div className="hidden md:block">
				<RegistrationBannerDesktop />
			</div>

			<div className="block md:hidden">
				<RegistrationBannerMobile />
			</div>
		</>
	);
}

export default RegistrationBanner;
