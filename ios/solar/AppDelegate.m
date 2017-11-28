/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "ReactNativeConfig.h"

@import GooglePlaces;
@import GoogleMaps;

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  // 1. Load the LaunchScreen from the xib file
  UIView *backgroundView = [[[NSBundle mainBundle] loadNibNamed:@"LaunchScreen" owner:self options:nil] firstObject];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"solar"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  

  
  // 2. Set the backgroundColor of the react view to be transparent
  rootView.backgroundColor = [UIColor clearColor];
  backgroundView.frame = UIScreen.mainScreen.bounds;
  
  NSString *placesAPI = [ReactNativeConfig envFor:@"PLACES_API"];
  NSString *servicesAPI = [ReactNativeConfig envFor:@"SERVICES_API"];
  
  [GMSPlacesClient provideAPIKey:placesAPI];
  [GMSServices provideAPIKey:servicesAPI];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  // 3. Set the backgroundView as main view for the rootViewController (instead of the rootView)
  rootViewController.view = backgroundView;
  [self.window makeKeyAndVisible];

  // 4. After the window is visible, add the rootView as a subview to your backgroundView
  [backgroundView addSubview:rootView];
  
  // 5. Then make the rootViews frame the same as the backgroundView
  rootView.frame = backgroundView.frame;

  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
