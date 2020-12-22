export const design = function (username: string, email_token: string) {
    return (
        `
        <div>
                <div style="background:#385aff;background-color:#385aff;margin:0px auto;max-width:100%">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#385aff;background-color:#385aff;width:100%">
                        <tbody>
                            <tr>
                                <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center">
                                    <div class="m_-2970246114885662865mj-column-per-100" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%">
                                            <tbody><tr>
                                                <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word">
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px">
                                                        <tbody>
                                                            <tr>
                                                                <td style="width:50px"><img height="auto" src="https://ci5.googleusercontent.com/proxy/LP2vN9FHqVKiPzUsY40xfEfbDesz7F4aMWU1a7Znp6coWJwMfM-Oknd9GKigt8bvj_RO4ys_klWJo4fOD9UA=s0-d-e1-ft#https://gcs.dustin.sh/u/747093dfabc4028e.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px" width="50" class="CToWUd"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div><div style="background:#f9f9f9;background-color:#f9f9f9;margin:0px auto;max-width:100%">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f9f9f9;background-color:#f9f9f9;width:100%">
                <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center">
                            <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%">
                                    <tbody><tr>
                                        <td style="font-size:0px;word-break:break-word">
                                            <div style="height:25px">&nbsp; </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word">
                                            <div style="font-family:Colfax;font-size:18px;line-height:1;text-align:left;color:#737373">
                                                Hey there ${username}, thanks for signing up to <span class="il">Viber</span> Early Access!</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word">
                                            <div style="font-family:Colfax;font-size:18px;line-height:1;text-align:left;color:#737373">
                                                Please verify your email address by clicking the button below, you will also be
                                                able to access your referral code and track your invites once you verify your
                                                email.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word">
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%">
                                                <tbody><tr>
                                                    <td align="center" bgcolor="#385aff" role="presentation" style="border:none;border-radius:3px;background:#385aff" valign="middle"><a href='http://localhost:8080/auth/login?token=${email_token}' style="display:inline-block;background:#385aff;color:#ffffff;font-family:Colafx,Arial;font-size:15px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;border-radius:3px" target="_blank">Verify email</a></td>
                                                </tr>
                                            </tbody></table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-size:0px;word-break:break-word">
                                            <div style="height:10px">&nbsp; </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-size:0px;padding:10px 25px;word-break:break-word">
                                            <p style="border-top:solid 1px #848484;font-size:1;margin:0px auto;width:100%"></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word">
                                            <div style="font-family:Colafx,Arial;font-size:13px;line-height:1;text-align:left;color:#737373">
                                                If the button above does not work, or if the link doesn't open in the browser,
                                                copy this URL and paste it in your
                                                browser:
                                                <a href="http://localhost:8080/auth/login?token=${email_token}" style="font-weight:400;text-decoration:none;color:#737373" class="m_-2970246114885662865link" target="_blank">http://localhost:8080/auth/login?token=${email_token}</a></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-size:0px;word-break:break-word">
                                            <div style="height:10px">&nbsp; </div>
                                        </td>
                                    </tr>
                                </tbody></table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div><div style="background:white;background-color:white;margin:0px auto;max-width:100%">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:white;background-color:white;width:100%">
                        <tbody>
                            <tr>
                                <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center">
                                    <div class="m_-2970246114885662865mj-column-per-100" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%">
                                            <tbody><tr>
                                                <td style="font-size:0px;word-break:break-word">
                                                    <div style="height:15px">&nbsp; </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:30px;word-break:break-word">
                                                    <div style="font-family:MonikerBold,Arial;font-size:20px;font-weight:bold;line-height:1;text-align:center;color:#1d1d1d">
                                                        The most reliable way to subscribe to content creators.</div>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </div>
                                    <div class="m_-2970246114885662865mj-column-per-100 m_-2970246114885662865links" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%">
                                            <tbody><tr>
                                                <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word">
                                                    <div style="font-family:Colfax,Ariel;font-size:18px;font-weight:300;line-height:1;text-align:center;color:white">
                                                        <u></u><a href="http://localhost:3000/privacy" style="font-weight:400;text-decoration:none;color:#848484;margin-right:.5rem" class="m_-2970246114885662865link" target="_blank" >Privacy Policy </a>| <a href="http://localhost:3000/terms" style="font-weight:400;text-decoration:none;color:#848484;margin:0 .5rem" class="m_-2970246114885662865link" target="_blank" >Terms and Conditions </a>| <a href="http://localhost:3000/support" style="font-weight:400;text-decoration:none;color:#848484;margin-left:.5rem" class="m_-2970246114885662865link" target="_blank">Help &amp; Support </a><u></u>
                                                        <p style="font-weight:400;text-align:center;color:#848484">©
                                                            2020 <span class="il">Viber</span> Technology, Inc. All Rights Reserved.
                                                        </p><p>
                                                    </p><p></p></div>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table><div class="yj6qo"></div><div class="adL">
                </div></div><div class="adL">
            </div>
        </div>
        `
    )
}