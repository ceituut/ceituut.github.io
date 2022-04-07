---
layout: post
title: "State-Machine in Android/Kotlin"
date: 2022-04-01 21:15 +0330
categories: android
description: "ماشین حالت در اندروید - کاتلین"
author: mitiebh
--- 
# کار با ماشین-حالت (State-Machine) در اندروید

امروزه ماشین حالت در میان جامعه توسعه دهندگان اندروید بسیار محبوب شده است.  
در واقع توسعه و ساخت یک ماشین-حالت می تواند کار خسته کننده ای باشد،
و همینطور بکار بردن این همه انرژی و زمان برای ساختن یک ماشین-حالت بی عیب و نقص بجای کار کردن بر روی یک منطق یا
قابلیت های کسب کاری که داریم چندان فایده ای ندارد.  
از این رو، برای اینکه سریعتر به جواب برسم، سعی کردم از نمونه های آماده و از قبل ساخته شده استفاده کنم. حین جستجو در اینترنت به این کتابخانه برخوردم:  

[KStateMachine](https://github.com/nsk90/kstatemachine)  

عالیه. چیزی که میخواستیم با کاتلین ساخته شده.  
خیلی خب، برگردیم به بحثمون، سوال اینجاست که چه زمانی ما از ماشین حالت استفاده می کنیم؟
در برنامه های اندروید یا بهتر بگم این ماشین-حالت را در چه سناریو هایی میتونیم جا بدیم؟  

## اتومبیل ها (Automatives)

امروزه تقریبا در بیشتر اتومبیل های خارجی Android auto را برای سرگرمی و تفریج در خودرو ها می توان دید. وقتی برنامه ای اندرویدی برای اتومبیل می نویسیم باید حالت
یا وضعیت را اتومبیل را نیز در نظر بگیریم. مثلا یک ماشین می تواند در حالت روشن و بدون حرکت، حال حرکت، وضعیت پارک، وضعیت دنده معکوس یا وضعیت خاموش باشد. پس بر اساس
وضعیت خودرو، عملکرد آن نیز می تواند تغییر کند. برای مثال زمانی که اتومبیل خودران در حال رانندگی است، باید یک سری سرویس های داخلی غیر فعال شوند، مثلا کاربر 
نمی تواند تلفن خود را به بلوتوث متصل کند. یا بطور مشابه هنگامی که خودرو در وضعیت دنده عقب است باید دوربین عقب روشن شود. در تمام موارد مورد استفاده، باید بتوانیم
وضعیت خودرو را حفظ کنیم، تا در مورد اینکه چه اقدامی انجام دهیم یا چه اقدامی را محدود کنیم بتوانیم تصمیم گیری کنیم. اینجاست که به یک ماشین حالت نیاز داریم تا
حالت های مختلف را حفظ کند و ویژگی های فعال/غیرفعال یا مخفی کردن/نمایش اقدامات را داشته باشد.  

## خانه های هوشمند و دستگاهای هوشمند (Smart Building and Smart Devices)

هنگامی که با دستگاه های هوشمند مختلف در ارتباط هستیم، هر دستگاه ویژگی های خود را خواهد داشت. هر ویژگی یک حالت است، به عنوان مثال، ترموستات، زمانی که بیرون خنک
است، طبق پیکربندی باید اتاق داخل را گرم کند، وقتی بیرون گرم است، باید اتاق را در داخل خنک کند. بنابراین، ترموستات می تواند در حالت روشن، خاموش، حالت خنک کننده،
حالت گرمایش و غیره باشد. وقتی از طریق ارتباط یا پروتکل به این دستگاه متصل می شویم، ما/برنامه باید وضعیت دستگاه را بدانیم و همچنین انتقال از یک حالت به آن را
بدانیم. دیگری، بر اساس این حالت، اقدامات خاصی باید در برنامه فعال یا غیرفعال شوند.  

استفاده ماشین-حالت می تواند بسیار بیشتر و گسترده تر باشد. مانند دستگاه های پزشکی، صنعتی، هوایی و غیره.  

علاوه بر این مثالها، ماشین-حالت در برنامه های کاربردی در آی تی نیز کاربرد دارد. برای مثال در درخواست و پاسخ های غیر همزمان که در وب اپکلیکیشن ها با معماری REST
داریم، کاربر درخواستی را می فرستد و منتظر پاسخ آن می ماند که باید سریعا به آن پاسخ داده شود که عملیات منتظر پاسخ های رویداد Web Socket است. در این موارد نیز
می توان از ماشین حالت برای پیاده سازی نیازمندی مورد نظر استفاده کرد.  

در ادامه یک مثال ساده در مورد نحوه استفاده و ادغام کتابخانه KStateMachine در برنامه خود خواهیم دید.  

![image](https://miro.medium.com/max/1400/1*ailT6b0jwsELXQ25aQP3Aw.png "title")  
  
برنامه ساده ای طراحی کردیم که سه حالت **سبز، قرمز، زرد** دارد. سناریوی وضعیت های آن بصورت زیر است:  

1. ماشین حالت می تواند در رنگ سبز باشد و به رنگ زرد برود.
2. از وضعیت زرد، یا به قرمز می تواند برود یا اینکه به سبز برگردد، تنها یه یکی از دو حالت دیگر می تواند حرکت کند.
3. ماشین حالت نمی تواند مستقیما از وضعیت سبز به قرمز برود.
4. اگر ماشین حالت به وضعیت قرمز برسد نمی تواند به وضعیت دیگری حرکت کند. قرمز وضعیت نهایی ماشین است.
5. در نهایت نیز قابلیت back to default داریم که ماشین به وضعیت اولیه خود برگردد.

بیایید شروع به ساختن برنامه کنیم، لازمه دوباره بگویم که، این فقط یک برنامه ساده/نمونه است که نباید مستقیماً از آن در برنامه خود همانطور که هست استفاده کنیم،
بلکه از الگوهای طراحی مناسب پیروی کنیم.  

### گام اول: در ابتدا باید Dependency های KStateMachine را به gradle برنامه اضافه کنیم

```kotlin
// State Machine
implementation 'com.github.nsk90:kstatemachine:0.6.0'
```

### گام دوم: کلاسی از نوع sealed برای حالتها می سازیم

```kotlin
import ru.nsk.kstatemachine.DefaultFinalState
import ru.nsk.kstatemachine.DefaultState

sealed class States {
    object GreenState: DefaultState("Green")
    object YellowState: DefaultState("Yellow")
    object RedState: DefaultFinalState("Red")
}
```

### گام سوم: همچنین کلاسی از نوع sealed برای Event های هر حالت می سازیم

```kotlin
import ru.nsk.kstatemachine.Event

sealed class Events {
    object YellowEvent: Event
    object RedEvent: Event
    object GreenEvent: Event
}
```

### گام چهارم: حال Activity Layout را می سازیم

فایل xml برنامه بصورت زیر خواهد بود:  

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".KStateMachineActivity">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center">

        <Button
            android:id="@+id/greenBtn"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_margin="5dp"
            android:onClick="green"
            android:text="Green" />

        <Button
            android:id="@+id/yellowBtn"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_margin="5dp"
            android:onClick="yellow"
            android:text="Yellow" />

        <Button
            android:id="@+id/redBtn"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_margin="5dp"
            android:onClick="red"
            android:text="Red" />

    </LinearLayout>

    <View
        android:id="@+id/stateRep"
        android:layout_width="290dp"
        android:layout_height="290dp"
        android:layout_gravity="center"
        android:background="@color/green"/>

    <Button
        android:layout_width="290dp"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:layout_margin="5dp"
        android:onClick="reset"
        android:text="Reset" />

</LinearLayout>
```

### گام پنجم: همچنین main Activity ما بصورت زیر خواهد بود  

اگر به کدهای activity دقت کنید، برنامه را اجرا کنید خواهید دید که ماشین-حالت مطابق با سناریویی که قبلا شکل داده بودیم چگونه کار می کند.  

```kotlin
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.karthik.scribble.statemachine.Events
import com.karthik.scribble.statemachine.States
import ru.nsk.kstatemachine.*

class KStateMachineActivity : AppCompatActivity(R.layout.activity_kstate_machine) {

    lateinit var machine: StateMachine
    lateinit var stateRep: View

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        stateRep = findViewById(R.id.stateRep)
        initializeStateMachine()
    }

    private fun initializeStateMachine() {
        machine = createStateMachine(name = "Scribble Machine", start = true) {
            /*Initial State - Green State - Start */
            addInitialState(States.GreenState) {
                onEntry {
                    Log.d("Karthik", "Enter $name state")
                    stateRep.setBackgroundColor(getColor(R.color.green))
                }

                transition<Events.YellowEvent> {
                    targetState = States.YellowState
                    onTriggered {
                        Log.d("Karthik", "Transition on YellowEvent")
                    }
                }

                transition<Events.GreenEvent> {
                    onTriggered {
                        Log.d("Karthik", "Transition on GreenEvent")
                    }
                }

                transition<Events.RedEvent> {
                    onTriggered {
                        Log.d("Karthik", "Transition on RedEvent")
                    }
                }

                onExit {
                    Log.d("Karthik", "Exit $name state")
                }
            }
            /*Initial State - Green State - End */

            /*State - Yellow State - Start */
            addState(States.YellowState) {
                onEntry {
                    Log.d("Karthik", "Enter $name state")
                    stateRep.setBackgroundColor(getColor(R.color.yellow))
                }

                transition<Events.GreenEvent> {
                    targetState = States.GreenState
                    onTriggered {
                        Log.d("Karthik", "Transition on GreenEvent")
                    }
                }

                transition<Events.RedEvent> {
                    targetState = States.RedState
                    onTriggered {
                        Log.d("Karthik", "Transition on RedEvent")
                    }
                }

                onExit {
                    Log.d("Karthik", "Exit $name state")
                }
            }
            /*State - Yellow State - End */

            /*Final State - Red State - Start */
            addFinalState(States.RedState) {
                onEntry {
                    Log.d("Karthik", "Enter $name state")
                    stateRep.setBackgroundColor(getColor(R.color.red))
                }

                onExit {
                    Log.d("Karthik", "Exit $name state")
                }
            }
            /*State - Red State - End */

        }
    }

    fun red(v: View) {
        machine.processEvent(Events.RedEvent)
    }

    fun yellow(v: View) {
        machine.processEvent(Events.YellowEvent)
    }

    fun green(v: View) {
        machine.processEvent(Events.GreenEvent)
    }

    fun reset(v: View) {
        machine.stop()
        machine.start()
    }
}
```

وقت آن رسیده که با ماشینهای-حالت کار کنید و خودتان دست بکار شوید. موفق باشید.  

👈 ترجمه شده از [مقاله اصلی](https://medium.com/@karthik.dusk/state-machine-in-android-kotlin-4f04e4121062)
