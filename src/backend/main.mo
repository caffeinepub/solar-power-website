import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";
import Principal "mo:core/Principal";

actor {
  // Initialize the user system state
  let accessControlState = AccessControl.initState();

  let baseDomain = "https://sanwariya-solar-power-website-590.caffeine.xyz";
  let sitemapContent = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"https://www.sitemaps.org/schemas/sitemap/0.9\">\n    <url>\n        <loc>https://sanwariya-solar-power-website-590.caffeine.xyz/</loc>\n        <changefreq>daily</changefreq>\n        <priority>1.0</priority>\n    </url>\n    <url>\n        <loc>https://sanwariya-solar-power-website-590.caffeine.xyz/about-us</loc>\n        <changefreq>monthly</changefreq>\n        <priority>0.8</priority>\n    </url>\n    <url>\n        <loc>https://sanwariya-solar-power-website-590.caffeine.xyz/solar-products</loc>\n        <changefreq>monthly</changefreq>\n        <priority>0.8</priority>\n    </url>\n    <url>\n        <loc>https://sanwariya-solar-power-website-590.caffeine.xyz/services</loc>\n        <changefreq>monthly</changefreq>\n        <priority>0.8</priority>\n    </url>\n    <url>\n        <loc>https://sanwariya-solar-power-website-590.caffeine.xyz/contact</loc>\n        <changefreq>monthly</changefreq>\n        <priority>0.7</priority>\n    </url>\n    <url>\n        <loc>https://sanwariya-solar-power-website-590.caffeine.xyz/blog</loc>\n        <changefreq>monthly</changefreq>\n        <priority>0.7</priority>\n    </url>\n    <url>\n        <loc>https://sanwariya-solar-power-website-590.caffeine.xyz/gallery</loc>\n        <changefreq>monthly</changefreq>\n        <priority>0.7</priority>\n    </url>\n</urlset>\n";

  include MixinStorage();
  include MixinAuthorization(accessControlState);

  var nextApplicationId = 0;
  var nextGalleryId = 0;

  type DocumentType = {
    #aadhaarCard;
    #bankPassbook;
    #electricityBill;
    #passportPhoto;
  };

  type PmSuryaGharApplication = {
    id : Nat;
    fullName : Text;
    email : Text;
    phoneNumber : Text;
    aadhaarCard : Storage.ExternalBlob;
    bankPassbook : Storage.ExternalBlob;
    electricityBill : Storage.ExternalBlob;
    passportPhoto : Storage.ExternalBlob;
    timestamp : Int;
    status : Text;
    submittedBy : Principal;
  };

  type ContactSubmission = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Int;
  };

  type GalleryItem = {
    id : Nat;
    blob : Storage.ExternalBlob;
    title : Text;
    description : Text;
    timestamp : Int;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };

  module PmSuryaGharApplication {
    public func compare(a : PmSuryaGharApplication, b : PmSuryaGharApplication) : Order.Order {
      Nat.compare((-a.timestamp).toNat(), (-b.timestamp).toNat());
    };
  };

  module GalleryItem {
    public func compare(a : GalleryItem, b : GalleryItem) : Order.Order {
      Nat.compare((-a.timestamp).toNat(), (-b.timestamp).toNat());
    };
  };

  let pmSuryaGharApplications = Map.empty<Nat, PmSuryaGharApplication>();
  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  let gallery = Map.empty<Nat, GalleryItem>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Public: Serve sitemap.xml content
  public query ({ caller }) func getSitemapXml() : async Text {
    sitemapContent;
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Admin-only: Get filtered applications
  public query ({ caller }) func getPmSuryaGharApplicationsFiltered(
    searchTerm : Text,
    status : Text,
  ) : async [PmSuryaGharApplication] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admin access required");
    };

    let searchTermLower = searchTerm.toLower();
    pmSuryaGharApplications.values().toArray().filter(
      func(application) {
        let matchesStatus = switch (status.isEmpty(), application.status == status) {
          case (true, _) { true };
          case (_, true) { true };
          case (_) { false };
        };

        let matchesSearchTerm : Bool = if (searchTerm.isEmpty()) {
          true;
        } else {
          let fullNameLower = application.fullName.toLower();
          fullNameLower.contains(#text searchTermLower) or application.phoneNumber.contains(#text searchTerm);
        };

        matchesStatus and matchesSearchTerm
      }
    ).sort();
  };

  // Public: Anyone can submit an application (including guests)
  public shared ({ caller }) func submitPmSuryaGharApplication(
    fullName : Text,
    email : Text,
    phoneNumber : Text,
    aadhaarCard : Storage.ExternalBlob,
    bankPassbook : Storage.ExternalBlob,
    electricityBill : Storage.ExternalBlob,
    passportPhoto : Storage.ExternalBlob,
  ) : async {
    id : Nat;
    status : Text;
  } {
    // No authorization check - public submission allowed for all users including guests
    let applicationId = nextApplicationId;
    nextApplicationId += 1;

    let application : PmSuryaGharApplication = {
      id = applicationId;
      fullName;
      email;
      phoneNumber;
      aadhaarCard;
      bankPassbook;
      electricityBill;
      passportPhoto;
      timestamp = Time.now();
      status = "pending";
      submittedBy = caller;
    };

    pmSuryaGharApplications.add(applicationId, application);

    {
      id = applicationId;
      status = application.status;
    };
  };

  // Protected: Only application owner or admin can check status
  public query ({ caller }) func getApplicationStatus(applicationId : Nat) : async Text {
    switch (pmSuryaGharApplications.get(applicationId)) {
      case (null) { Runtime.trap("Application not found") };
      case (?application) {
        if (caller != application.submittedBy and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own application status");
        };
        application.status;
      };
    };
  };

  // Admin-only: Add gallery items
  public shared ({ caller }) func addGalleryItem(
    blob : Storage.ExternalBlob,
    title : Text,
    description : Text,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add gallery items");
    };

    let id = nextGalleryId;
    nextGalleryId += 1;

    let item : GalleryItem = {
      id;
      blob;
      title;
      description;
      timestamp = Time.now();
    };

    gallery.add(id, item);
    id;
  };

  // Public: Anyone can view gallery
  public query ({ caller }) func getGallery() : async [GalleryItem] {
    // No authorization check - public access
    gallery.values().toArray().sort();
  };

  // Public: Anyone can submit contact form (including guests)
  public shared ({ caller }) func submitContactForm(
    name : Text,
    email : Text,
    phone : Text,
    message : Text,
  ) : async {
    id : Nat;
    timestamp : Int;
  } {
    // No authorization check - public submission allowed for all users including guests
    let submissionId = nextApplicationId;
    nextApplicationId += 1;

    let newSubmission : ContactSubmission = {
      name;
      email;
      phone;
      message;
      timestamp = Time.now();
    };

    contactSubmissions.add(submissionId, newSubmission);

    {
      id = submissionId;
      timestamp = newSubmission.timestamp;
    };
  };

  // Admin-only: Update application status
  public shared ({ caller }) func updateApplicationStatus(applicationId : Nat, newStatus : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update application status");
    };

    switch (pmSuryaGharApplications.get(applicationId)) {
      case (null) { Runtime.trap("Application not found") };
      case (?application) {
        let updatedApplication = { application with status = newStatus };
        pmSuryaGharApplications.add(applicationId, updatedApplication);
      };
    };
  };

  // Admin-only: Get application by ID
  public query ({ caller }) func getPmSuryaGharApplicationById(applicationId : Nat) : async PmSuryaGharApplication {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admin access required");
    };

    switch (pmSuryaGharApplications.get(applicationId)) {
      case (null) { Runtime.trap("Application not found") };
      case (?application) { application };
    };
  };

  // Public: Anyone can view all gallery items
  public query ({ caller }) func getAllGalleryItems() : async [GalleryItem] {
    // No authorization check - public access
    gallery.values().toArray();
  };

  // Admin-only: Get all contact submissions
  public query ({ caller }) func getContactSubmissions() : async [ContactSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    contactSubmissions.values().toArray();
  };
};

