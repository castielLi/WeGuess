//
//  Test.m
//  WeGuess
//
//  Created by castiel on 2017/9/5.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "Test.h"
#import <UIKit/UIKit.h>


@implementation Test

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(testNormalEvent:(NSString *)name forSomething:(NSString *)thing){
  NSString *info = [NSString stringWithFormat:@"Test: %@\nFor: %@", name, thing];
  
  
  
  NSLog(@"Test:%@", UIApplication.sharedApplication.keyWindow);
}

@end
